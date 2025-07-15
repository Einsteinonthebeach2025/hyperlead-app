import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { notifyRecurringPayment } from "app/lib/actions/notificationActions";

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
