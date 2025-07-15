import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { notifyRecurringPayment } from "app/lib/actions/notificationActions";

export const handleRecurringPaymentCompleted = async (
  eventId,
  resource,
  supabaseAdmin
) => {
  console.log("TEST HANDLER", eventId, resource);
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
