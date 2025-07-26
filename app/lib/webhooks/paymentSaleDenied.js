import supabaseAdmin from "app/lib/config/supabaseAdmin";

export const handlePaymentSaleDenied = async (
  eventId,
  resource,
  supabaseAdminInstance = supabaseAdmin
) => {
  console.log(`[Handler] handlePaymentSaleDenied called. eventId: ${eventId}`);
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

  // 3. Find user by parent_payment (paypal_order_id)
  const parentPaymentId = resource.parent_payment;
  const { data: transaction } = await supabaseAdminInstance
    .from("transactions")
    .select("user_id")
    .eq("paypal_order_id", parentPaymentId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  if (!transaction) {
    console.log(
      `[Handler] No transaction found for parent_payment: ${parentPaymentId}`
    );
    return { success: false, error: "User not found for parent_payment" };
  }
  const userId = transaction.user_id;
  const { data: user } = await supabaseAdminInstance
    .from("profiles")
    .select("id, email, userName, subscription, subscription_type")
    .eq("id", userId)
    .single();
  if (!user) {
    console.log(`[Handler] No user profile found for userId: ${userId}`);
    return { success: false, error: "User profile not found" };
  }

  // 4. Create failed transaction
  await supabaseAdminInstance.from("transactions").insert({
    user_id: userId,
    paypal_order_id: parentPaymentId,
    plan_name: user.subscription,
    amount: resource.amount?.total,
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
    failure_reason: resource.state || "denied",
  });

  // 5. Update user profile (optional: set subscription_status to 'past_due' or 'payment_failed')
  await supabaseAdminInstance
    .from("profiles")
    .update({ subscription_status: "payment_failed", subscription: null })
    .eq("id", userId);
  console.log(
    `[Handler] Updated user profile to payment_failed. userId: ${userId}`
  );

  // 6. Send notification (inline)
  // You can replace this with your own email logic or in-app notification
  console.log(
    `[Handler] Notification: Payment failed for user ${user.email} (ID: ${userId}). Reason: ${resource.state || "denied"}`
  );

  return { success: true };
};
