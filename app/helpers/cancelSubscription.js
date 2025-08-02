import { notifySubscriptionCancel } from "app/lib/actions/notificationActions";
import { sendSubscriptionCancelEmail } from "app/lib/actions/emailActions";
import { cancelSubscription } from "app/lib/actions/transactionActions";

/**

 * @param {string} subscriptionId 
 * @param {Object} user
 * @param {boolean} isAdmin
 * @returns {Object}
 */
export const cancelSubscriptionUnified = async (
  subscriptionId,
  user,
  isAdmin = false
) => {
  try {
    if (!subscriptionId) {
      return { success: false, error: "No subscription ID provided" };
    }

    if (!user) {
      return { success: false, error: "No user object provided" };
    }
    // 1. Cancel subscription via PayPal API
    const cancelResponse = await fetch("/api/paypal/cancel-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId }),
    });
    const cancelData = await cancelResponse.json();
    if (!cancelData.success) {
      console.warn(
        `❌ Failed to cancel subscription via PayPal API: ${subscriptionId}`,
        cancelData.error
      );
      return {
        success: false,
        error: cancelData.error || "Failed to cancel subscription via PayPal",
      };
    }
    // 2. Send notification to user
    try {
      await notifySubscriptionCancel(user.id, subscriptionId);
    } catch (notifyError) {
      console.warn(
        `⚠️ Failed to send notification for subscription cancellation: ${subscriptionId}`,
        notifyError
      );
    }
    // 3. Send email notification
    try {
      await sendSubscriptionCancelEmail({
        userName: user?.userName,
        email: user.email,
        cancelled_at: new Date(),
        subscriptionId: subscriptionId,
      });
    } catch (emailError) {
      console.warn(
        `⚠️ Failed to send email for subscription cancellation: ${subscriptionId}`,
        emailError
      );
    }
    // 4. Create transaction record for cancellation
    try {
      await cancelSubscription(user.id, subscriptionId, new Date());
    } catch (transactionError) {
      console.warn(
        `⚠️ Failed to create transaction record for subscription cancellation: ${subscriptionId}`,
        transactionError
      );
    }
    return { success: true };
  } catch (error) {
    console.error(
      `Error in subscription cancellation for ${subscriptionId}:`,
      error
    );
    return { success: false, error: error.message };
  }
};
