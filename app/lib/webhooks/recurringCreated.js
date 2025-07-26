import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "../actions/transactionActions";
import {
  notifyUserOnSubscription,
  notifyUserOnRecurring,
} from "../actions/notificationActions";
import { getPlanDetails } from "app/lib/config/paypalConfig";

export const handleRecurringPaymentCompleted = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  // 1. IDEMPOTENCY CHECK
  const { data: existingEvent, error: eventCheckError } = await supabaseAdmin
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .single();
  if (existingEvent) {
    return { success: true, duplicate: true };
  }

  // 2. INSERT PAYPAL EVENT
  const now = new Date().toISOString();
  const resourceId = resource.id || null;
  console.log(resourceId, "resource id");

  const { error: insertError } = await supabaseAdmin
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now, resource_id: resourceId });
  if (insertError) {
    return { success: false, error: "Failed to insert event" };
  }

  // 3. FIND USER AND ASSIGN LEADS
  const subscriptionId = resource.billing_agreement_id;
  const { data: user, error: findError } = await supabaseAdmin
    .from("profiles")
    .select(
      "id, email, preferences, subscription, subscription_status, userName, subscription_type"
    )
    .eq("subscription_id", subscriptionId)
    .single();

  if (findError || !user) {
    return { success: false, error: "User not found for subscription_id" };
  }
  const planName = user?.subscription || "UNKNOWN SUBSCRIPTION NAME";
  const subscriptionType =
    user?.subscription_type?.toLowerCase() === "annual" ? "annual" : "monthly";
  const planDetails = getPlanDetails(planName, subscriptionType);
  console.log("[DEBUG] planDetails:", planDetails);
  console.log(
    "[DEBUG] planDetails.price:",
    planDetails.price,
    "typeof:",
    typeof planDetails.price
  );
  if (!planDetails) {
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
    return { success: false, error: "Failed to assign leads" };
  }

  // Check if this is the first payment for this subscription
  const { data: existingTransactions, error: txError } = await supabaseAdmin
    .from("transactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("paypal_order_id", subscriptionId)
    .eq("status", "COMPLETED");

  const isFirstPayment =
    !existingTransactions || existingTransactions.length === 0;

  // 4. NOTIFY USERS ON SUBSCRIPTION OR RECURRING
  try {
    if (isFirstPayment) {
      await notifyUserOnSubscription(
        user.id,
        user.userName || user.email,
        user.subscription,
        assignResult.assignedLeadsCount,
        supabaseAdmin
      );
    } else {
      await notifyUserOnRecurring(
        user.id,
        user.userName || user.email,
        user.subscription,
        assignResult.assignedLeadsCount,
        supabaseAdmin
      );
    }
  } catch (notifyError) {
    console.error(
      "[Webhook] Exception in notifyUserOnSubscription/Recurring:",
      notifyError
    );
  }

  // 5. CREATE TRANSACTION FOR SUBSCRIPTION
  const transactionResult = await createTransaction(
    user.id,
    subscriptionId,
    planName,
    planDetails.price,
    { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
    { name: user.email, email: user.email },
    null,
    supabaseAdmin,
    {
      current_status: "active",
      resource_id: resourceId,
      subscription_type: user?.subscription_type,
    }
  );

  if (!transactionResult.success) {
    return { success: false, error: "Failed to create transaction" };
  }

  return { success: true };
};
