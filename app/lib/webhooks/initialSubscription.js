export const handleInitialSubscription = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  try {
    console.log("[Webhook] handleInitialSubscription called", {
      eventId,
      resource,
    });
    const subscriptionId = resource.id;
    // Find user by email or other identifier in resource (customize as needed)
    // For now, assume resource has payer info with email
    const payerEmail =
      resource?.subscriber?.email_address || resource?.payer?.email_address;
    if (!payerEmail) {
      console.error("[Webhook] No payer email found in resource");
      return { success: false, error: "No payer email found" };
    }
    // Update user profile with subscription_id
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ subscription_id: subscriptionId })
      .eq("email", payerEmail);
    if (updateError) {
      console.error(
        "[Webhook] Failed to update user profile with subscription_id",
        updateError
      );
      return { success: false, error: "Failed to update user profile" };
    }
    console.log(
      "[Webhook] User profile updated with subscription_id",
      subscriptionId
    );
    return { success: true };
  } catch (error) {
    console.error("[Webhook] Error in handleInitialSubscription", error);
    return { success: false, error: error.message };
  }
};
