import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";

export const handleRecurringPaymentCompleted = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  // 1. Idempotency check: Has this event already been processed?
  const { data: existingEvent, error: eventCheckError } = await supabaseAdmin
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .single();
  if (existingEvent) {
    console.log(`[Webhook] Duplicate event detected: ${eventId}`);
    return { success: true, duplicate: true };
  }

  // 2. Insert the event into paypal_events table
  const now = new Date().toISOString();
  const resourceId = resource.id || null;

  const { error: insertError } = await supabaseAdmin
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now, resource_id: resourceId });
  if (insertError) {
    console.error("[Webhook] Failed to insert event:", insertError);
    return { success: false, error: "Failed to insert event" };
  }

  // 3. FIND USER
  const subscriptionId = resource.billing_agreement_id;
  const { data: user, error: findError } = await supabaseAdmin
    .from("profiles")
    .select("id, email, preferences, subscription, subscription_status")
    .eq("subscription_id", subscriptionId)
    .single();

  if (findError || !user) {
    console.error(
      `[Webhook] User not found for subscription_id: ${subscriptionId}`,
      findError
    );
    return { success: false, error: "User not found for subscription_id" };
  }
  const planName = user?.subscription || "UNKNOWN SUBSCRIPTION NAME";
  const planDetails = getPlanDetails(planName);
  if (!planDetails) {
    console.error(`[Webhook] Invalid plan name: ${planName}`);
    return { success: false, error: "Invalid plan name" };
  }

  const assignResult = await assignLeadsToUser(
    user.id,
    user.email,
    user.preferences,
    planDetails.leads,
    true,
    supabaseAdmin,
    planDetails.leads
  );

  if (!assignResult.success) {
    console.error(`[Webhook] Failed to assign leads to user: ${user.id}`);
    return { success: false, error: "Failed to assign leads" };
  }

  // Notify user about subscription
  try {
    const notifyResult = await notifyUserOnSubscription(
      assignResult.assignedLeadsCount,
      supabaseAdmin
    );
    if (notifyResult.error) {
      console.error(
        "[Webhook] Failed to send subscription notification:",
        notifyResult.error
      );
    }
  } catch (notifyError) {
    console.error(
      "[Webhook] Exception in notifyUserOnSubscription:",
      notifyError
    );
  }

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
