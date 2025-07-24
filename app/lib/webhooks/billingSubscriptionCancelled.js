import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { sendSubscriptionCancelEmail } from "app/lib/actions/emailActions";

export const handleBillingSubscriptionCancelled = async (
  eventId,
  resource,
  supabaseAdminInstance = supabaseAdmin
) => {
  console.log(
    `[Handler] handleBillingSubscriptionCancelled called. eventId: ${eventId}`
  );
  // 1. Idempotency check
  const { data: existingEvent } = await supabaseAdminInstance
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .single();
  if (existingEvent) {
    console.log(`[Handler] Duplicate event detected. eventId: ${eventId}`);
    return { success: true, duplicate: true };
  }

  // 2. Insert event
  const now = new Date().toISOString();
  const resourceId = resource.id || null;
  await supabaseAdminInstance
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now, resource_id: resourceId });

  // 3. Find user by subscription id
  const subscriptionId = resource.id;
  const { data: user } = await supabaseAdminInstance
    .from("profiles")
    .select("id, email, userName, subscription, subscription_type")
    .eq("subscription_id", subscriptionId)
    .single();
  if (!user) {
    console.log(
      `[Handler] No user found for subscription_id: ${subscriptionId}`
    );
    return { success: false, error: "User not found for subscription_id" };
  }

  // 4. Update user profile (set subscription: null, subscription_status: 'cancelled')
  await supabaseAdminInstance
    .from("profiles")
    .update({ subscription_status: "cancelled", subscription: null })
    .eq("id", user.id);
  console.log(
    `[Handler] Updated user profile to cancelled. userId: ${user.id}`
  );

  // 5. Send cancellation email
  await sendSubscriptionCancelEmail({
    userName: user.userName,
    email: user.email,
    cancelled_at: now,
  });
  console.log(`[Handler] Sent cancellation email to user: ${user.email}`);

  // 6. Insert notification inline
  await supabaseAdminInstance.from("notifications").insert({
    user_id: user.id,
    type: "subscription_cancelled",
    message: `Your subscription has been cancelled as of ${now}.`,
    created_at: now,
    read: false,
    importance: "high",
    metadata: {},
    action_url: "",
  });
  console.log(
    `[Handler] Inserted cancellation notification for user: ${user.email}`
  );

  return { success: true };
};
