import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { sendSubscriptionCancelEmail } from "app/lib/actions/emailActions";

export const handleBillingSubscriptionFailed = async (
  eventId,
  resource,
  supabaseAdminInstance = supabaseAdmin
) => {
  console.log(
    `[Handler] handleBillingSubscriptionFailed called. eventId: ${eventId}`
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

  // 4. Create failed transaction
  await supabaseAdminInstance.from("transactions").insert({
    user_id: user.id,
    paypal_order_id: subscriptionId,
    plan_name: user.subscription,
    amount: resource.last_failed_payment?.amount?.value || null,
    status: "FAILED",
    card_brand: "PayPal",
    card_last4: "N/A",
    masked_card: "PayPal Subscription",
    payer_name: user.userName || user.email,
    payer_email: user.email,
    created_at: now,
    current_status: "failed",
    resource_id: resourceId,
    subscription_type: user.subscription_type,
    failure_reason:
      resource.billing_info?.last_failed_payment?.reason_code ||
      "payment_failed",
  });

  // 5. Update user profile (optional: set subscription_status to 'payment_failed')
  await supabaseAdminInstance
    .from("profiles")
    .update({ subscription_status: "payment_failed", subscription: null })
    .eq("id", user.id);
  console.log(
    `[Handler] Updated user profile to payment_failed. userId: ${user.id}`
  );

  // 6. Send cancellation email
  await sendSubscriptionCancelEmail({
    userName: user.userName,
    email: user.email,
    cancelled_at: now,
  });
  console.log(`[Handler] Sent cancellation email to user: ${user.email}`);

  // 7. Send notification (inline)
  await supabaseAdminInstance.from("notifications").insert({
    user_id: user.id,
    type: "subscription_payment_failed",
    message: `Your subscription payment failed. Reason: ${resource.billing_info?.last_failed_payment?.reason_code || "payment_failed"}`,
    created_at: now,
    read: false,
    importance: "high",
    metadata: {},
    action_url: "",
  });
  console.log(
    `[Handler] Inserted payment_failed notification for user: ${user.email}`
  );

  return { success: true };
};
