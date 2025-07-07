import {
  assignLeadsToUser,
  addExtraLeads,
  unlockingLeads,
} from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { notifyUserOnSubscription } from "app/lib/actions/notificationActions";

export const handleSubscriptionCreated = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  const subscriptionId = resource.id;
  const now = new Date().toISOString();

  // 1. IDEMPOTENCY CHECK
  const { data: existingEvent, error: eventCheckError } = await supabaseAdmin
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .single();

  if (existingEvent) {
    return { success: true, duplicate: true };
  }

  await supabaseAdmin
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now });

  // 2. FIND USER BY SUBSCRIPTION_ID
  const { data: user, error: findError } = await supabaseAdmin
    .from("profiles")
    .select("id, email, preferences, subscription, subscription_status")
    .eq("subscription_id", subscriptionId)
    .single();

  if (findError || !user) {
    return { success: false, error: "User not found for subscription_id" };
  }

  // 3. GET PLAN DETAILS
  const planName = user.subscription || "UNKNOWN";
  const planDetails = getPlanDetails(planName);
  if (!planDetails) {
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
    null,
    supabaseAdmin,
    {
      recurring: false,
      subscription_created: true,
    }
  );

  if (!transactionResult.success) {
    return { success: false, error: "Failed to create transaction" };
  }

  // 6. UPDATE USER PROFILE
  const updates = {
    subscription: planName,
    subscription_status: "active",
    subscription_timestamp: now,
    monthly_leads: planDetails.leads,
    leads_received_this_month: planDetails.leads,
    last_lead_reset_date: now,
    last_notification_timestamp: null,
    last_leads_finished_notification: null,
    total_leads_received: planDetails.leads,
  };

  const { error: updateProfileError } = await updateProfile(
    user.id,
    updates,
    supabaseAdmin
  );
  if (updateProfileError) {
    return { success: false, error: "Failed to update user profile" };
  }

  // 7. SEND NOTIFICATION
  const notifyResult = await notifyUserOnSubscription(
    planDetails.leads,
    supabaseAdmin
  );
  if (notifyResult.error) {
    console.error(
      "Failed to send subscription notification:",
      notifyResult.error
    );
  }

  return { success: true };
};

// export const handlePaymentCaptureCompleted = async (
//   eventId,
//   resource,
//   supabaseAdmin
// ) => {
//   const captureId = resource.id;
//   const orderId = resource.supplementary_data?.related_ids?.order_id;
//   const now = new Date().toISOString();

//   // 1. IDEMPOTENCY CHECK
//   const { data: existingEvent, error: eventCheckError } = await supabaseAdmin
//     .from("paypal_events")
//     .select("id")
//     .eq("event_id", eventId)
//     .single();

//   if (existingEvent) {
//     return { success: true, duplicate: true };
//   }

//   await supabaseAdmin
//     .from("paypal_events")
//     .insert({ event_id: eventId, received_at: now });

//   // 2. FIND USER BY ORDER_ID (we need to store this mapping)
//   const { data: user, error: findError } = await supabaseAdmin
//     .from("profiles")
//     .select("id, email, preferences")
//     .eq("temp_order_id", orderId)
//     .single();

//   if (findError || !user) {
//     return { success: false, error: "User not found for order_id" };
//   }

//   // 3. GET PLAN DETAILS FROM ORDER
//   const { data: orderData, error: orderError } = await supabaseAdmin
//     .from("temp_orders")
//     .select("plan_name, amount")
//     .eq("order_id", orderId)
//     .single();

//   if (orderError || !orderData) {
//     return { success: false, error: "Order data not found" };
//   }

//   const planName = orderData.plan_name;
//   const amount = orderData.amount;

//   // 4. HANDLE DIFFERENT PLAN TYPES
//   if (planName === "EXTRA_100") {
//     const extraLeadsResult = await addExtraLeads(user.id, supabaseAdmin);
//     if (!extraLeadsResult.success) {
//       return { success: false, error: "Failed to add extra leads" };
//     }
//   } else if (planName === "SINGLE_LEAD") {
//     // Handle single lead unlock - this would need the lead_id from the order
//     const { data: orderDetails } = await supabaseAdmin
//       .from("temp_orders")
//       .select("metadata")
//       .eq("order_id", orderId)
//       .single();

//     if (orderDetails?.metadata?.leadId) {
//       const unlockResult = await unlockingLeads(
//         orderDetails.metadata.leadId,
//         user.id,
//         user.email,
//         user.userName,
//         supabaseAdmin
//       );
//       if (!unlockResult.success) {
//         return { success: false, error: "Failed to unlock lead" };
//       }
//     }
//   } else {
//     // Handle subscription plan one-time payment
//     const planDetails = getPlanDetails(planName);
//     if (!planDetails) {
//       return { success: false, error: "Invalid plan name" };
//     }

//     const assignResult = await assignLeadsToUser(
//       user.id,
//       user.email,
//       user.preferences,
//       planDetails.leads,
//       false,
//       supabaseAdmin
//     );

//     if (!assignResult.success) {
//       return { success: false, error: "Failed to assign leads" };
//     }
//   }

//   // 5. CREATE TRANSACTION
//   const transactionResult = await createTransaction(
//     user.id,
//     orderId,
//     planName,
//     amount,
//     { brand: "PayPal", last4: "N/A", maskedCard: "PayPal" },
//     { name: user.email, email: user.email },
//     captureId,
//     supabaseAdmin,
//     {
//       recurring: false,
//       one_time_payment: true,
//     }
//   );

//   if (!transactionResult.success) {
//     return { success: false, error: "Failed to create transaction" };
//   }

//   // 6. CLEAN UP TEMP DATA
//   await supabaseAdmin
//     .from("profiles")
//     .update({ temp_order_id: null })
//     .eq("id", user.id);

//   await supabaseAdmin.from("temp_orders").delete().eq("order_id", orderId);

//   return { success: true };
// };

// Helper function to get plan details
const getPlanDetails = (planName) => {
  const plans = {
    PLUS: { leads: 150, price: 0.01 },
    PRO: { leads: 400, price: 0.01 },
    HYPER: { leads: 800, price: 0.01 },
  };
  return plans[planName.toUpperCase()];
};
