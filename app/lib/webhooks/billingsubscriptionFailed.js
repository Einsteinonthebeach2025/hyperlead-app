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
    .select(
      "id, email, userName, subscription, subscription_type, subscription_id"
    )
    .eq("subscription_id", subscriptionId)
    .single();
  if (!user) {
    console.log(
      `[Handler] No user found for subscription_id: ${subscriptionId}`
    );
    return { success: false, error: "User not found for subscription_id" };
  }

  // 3. Insert FAILED transaction for this subscription if a previous transaction exists
  const { data: lastTransaction, error: fetchTxError } =
    await supabaseAdminInstance
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .eq("paypal_order_id", subscriptionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
  if (lastTransaction) {
    const {
      id,
      created_at,
      cancelled_at,
      status,
      current_status,
      failure_reason,
      ...rest
    } = lastTransaction;
    const failedTransaction = {
      ...rest,
      current_status: "FAILED",
      status: "FAILED",
      created_at: now,
    };
    await supabaseAdminInstance.from("transactions").insert(failedTransaction);
  }

  // 4. Update user profile
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
