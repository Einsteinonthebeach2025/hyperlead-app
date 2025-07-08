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
    // No reliable way to map to user, so just log and return success
    return { success: true };
  } catch (error) {
    console.error("[Webhook] Error in handleInitialSubscription", error);
    return { success: false, error: error.message };
  }
};
