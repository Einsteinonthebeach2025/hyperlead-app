import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { notifyRecurringPayment } from "app/lib/actions/notificationActions";

export const handleRecurringPaymentCompleted = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  console.log("[Webhook] handleSubscriptionCreated called", {
    eventId,
    resource,
  });
  console.log(
    "[Webhook] resource.billing_agreement_id:",
    resource.billing_agreement_id
  );
  console.log("[Webhook] resource.id (PayPal sale/txn):", resource.id);
  const subscriptionId = resource.billing_agreement_id;
  const now = new Date().toISOString();

  // 1. IDEMPOTENCY CHECK
  const { data: existingEvent, error: eventCheckError } = await supabaseAdmin
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .single();

  if (existingEvent) {
    console.log(`[Webhook] Duplicate event detected: ${eventId}`);
    return { success: true, duplicate: true };
  }

  await supabaseAdmin
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now, resource_id: resource.id });

  // 2. FIND USER BY SUBSCRIPTION_ID
  const { data: user, error: findError } = await supabaseAdmin
    .from("profiles")
    .select(
      "id, email, preferences, subscription, subscription_status, total_leads_received, leads_received_this_month"
    )
    .eq("subscription_id", subscriptionId)
    .single();

  if (findError || !user) {
    console.error(
      `[Webhook] User not found for subscription_id: ${subscriptionId}`,
      findError
    );
    return { success: false, error: "User not found for subscription_id" };
  }

  // 3. GET PLAN DETAILS
  const planName = user?.subscription || "UNKNOWN SUBSCRIPTION NAME";
  const planDetails = getPlanDetails(planName);
  if (!planDetails) {
    console.error(`[Webhook] Invalid plan name: ${planName}`);
    return { success: false, error: "Invalid plan name" };
  }

  // 4. ASSIGN LEADS TO USER
  const assignResult = await assignLeadsToUser(
    user.id,
    user.email,
    user.preferences,
    planDetails.leads,
    true,
    supabaseAdmin
  );

  if (!assignResult.success) {
    console.error(`[Webhook] Failed to assign leads to user: ${user.id}`);
    return { success: false, error: "Failed to assign leads" };
  }

  // 5. CREATE TRANSACTION
  const transactionResult = await createTransaction(
    user.id,
    subscriptionId,
    planName,
    planDetails.price,
    { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
    { name: user.email, email: user.email },
    supabaseAdmin,
    {
      current_status: "active",
      recourse_id: resource.id,
      seller_transaction_id: resource.id,
    }
  );

  if (!transactionResult.success) {
    console.error(
      `[Webhook] Failed to create transaction for user: ${user.id}`
    );
    return { success: false, error: "Failed to create transaction" };
  }

  // 6. UPDATE USER PROFILE
  // Fetch current values
  const currentTotalLeads = user.total_leads_received || 0;
  const currentLeadsThisMonth = user.leads_received_this_month || 0;

  const updates = {
    subscription: planName,
    subscription_status: "active",
    subscription_timestamp: now,
    monthly_leads: planDetails.leads,
    leads_received_this_month: currentLeadsThisMonth + planDetails.leads,
    last_lead_reset_date: now,
    last_notification_timestamp: null,
    last_leads_finished_notification: null,
    total_leads_received: currentTotalLeads + planDetails.leads,
  };

  const { error: updateProfileError } = await updateProfile(
    user.id,
    updates,
    supabaseAdmin
  );
  if (updateProfileError) {
    console.error(
      `[Webhook] Failed to update user profile for user: ${user.id}`,
      updateProfileError
    );
    return { success: false, error: "Failed to update user profile" };
  }

  // 7. SEND NOTIFICATION
  console.log("[Webhook] Notifying user:", {
    userId: user.id,
    userName: user.userName || user.email,
    planName,
    leads: planDetails.leads,
  });
  const notifyResult = await notifyRecurringPayment(
    user.id,
    user.userName || user.email,
    planName,
    planDetails.leads,
    supabaseAdmin
  );
  if (notifyResult.error) {
    console.error(
      "[Webhook] Failed to send subscription notification:",
      notifyResult.error
    );
  }

  console.log(
    `[Webhook] Subscription created and processed for user: ${user.id}`
  );
  return { success: true };
};

// Helper function to get plan details
const getPlanDetails = (planName) => {
  const plans = {
    PLUS: { leads: 150, price: 0.01 },
    PRO: { leads: 400, price: 0.01 },
    HYPER: { leads: 800, price: 0.01 },
  };
  return plans[planName.toUpperCase()];
};
