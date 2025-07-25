import supabase from "../config/supabaseClient";

export const createTransaction = async (
  userId,
  orderId,
  planName,
  amount,
  paymentMethod,
  payerInfo,
  captureId,
  supabaseClient = supabase,
  extraFields = {}
) => {
  const { brand, last4, maskedCard } = paymentMethod || {};
  const { name, email, address } = payerInfo || {};

  const { data, error } = await supabaseClient.from("transactions").insert({
    user_id: userId,
    paypal_order_id: orderId,
    plan_name: planName,
    resource_id: captureId,
    amount,
    status: "COMPLETED",
    card_brand: brand,
    card_last4: last4,
    masked_card: maskedCard,
    payer_name: name,
    payer_email: email,
    payer_address: address,
    created_at: new Date(),
    ...extraFields,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const cancelSubscription = async (
  userId,
  subscriptionId,
  cancelledAt
) => {
  try {
    // Fetch the latest transaction for this user and subscription
    const { data: transaction, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("paypal_order_id", subscriptionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (fetchError || !transaction) {
      return {
        success: false,
        error: "Transaction not found for this subscription.",
      };
    }

    const { id, created_at, cancelled_at, status, current_status, ...rest } =
      transaction;
    const newTransaction = {
      ...rest,
      current_status: "CANCELLED",
      status: "CANCELLED",
      cancelled_at: cancelledAt,
      created_at: new Date(),
    };
    // Insert new cancellation transaction
    const { error: insertError } = await supabase
      .from("transactions")
      .insert(newTransaction);
    if (insertError) {
      return { success: false, error: insertError.message };
    }
    // Update user profile: set subscription_id to null and subscription_status to "cancelled"
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ subscription_id: null, subscription_status: "cancelled" })
      .eq("id", userId);
    if (profileError) {
      return { success: false, error: profileError.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
