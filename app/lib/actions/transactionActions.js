import supabase from "../config/supabaseClient";
import { assignLeadsToUser } from "./leadActions";
import { updateProfile } from "./profileActions";
import { notifyUserOnSubscription } from "./notificationActions";

export const createTransaction = async (
  userId,
  orderId,
  planName,
  amount,
  paymentMethod,
  payerInfo,
  captureId
) => {
  const { brand, last4, maskedCard } = paymentMethod || {};
  const { name, email, address } = payerInfo || {};

  const { data, error } = await supabase.from("transactions").insert({
    user_id: userId,
    order_id: orderId,
    plan_name: planName,
    capture_id: captureId,
    amount,
    status: "COMPLETED",
    card_brand: brand,
    card_last4: last4,
    masked_card: maskedCard,
    payer_name: name,
    payer_email: email,
    payer_address: address,
    created_at: new Date(),
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const processSubscription = async (
  userId,
  userEmail,
  planName,
  leads
) => {
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("preferences")
      .eq("id", userId)
      .single();
    if (profileError) throw profileError;
    if (!userProfile?.preferences?.length) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }
    // Assign leads
    const { success, error: leadError } = await assignLeadsToUser(
      userId,
      userEmail,
      userProfile.preferences,
      leads,
      true
    );
    if (!success) throw new Error(leadError || "Failed to assign leads");
    // Update profile
    const currentMonthLeads = userProfile.leads_received_this_month || 0;
    const updates = {
      subscription: planName,
      subscription_timestamp: new Date().toISOString(),
      monthly_leads: leads,
      leads_received_this_month: currentMonthLeads + leads,
      last_lead_reset_date: new Date().toISOString(),
      last_notification_timestamp: null,
      last_leads_finished_notification: null,
    };
    const { error: updateError } = await updateProfile(userId, updates);
    if (updateError) throw updateError;
    // Send notification
    await notifyUserOnSubscription(leads);
    return { success: true };
  } catch (error) {
    console.error("Error processing subscription:", error);
    return { success: false, error: error.message };
  }
};
