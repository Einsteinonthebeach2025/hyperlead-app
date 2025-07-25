// Store the event for idempotency, nothing else
export async function handlePaymentCaptureCompleted(
  eventId,
  resource,
  supabaseAdmin
) {
  const resourceId = resource.id;
  const now = new Date().toISOString();

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("paypal_events")
    .select("id")
    .eq("event_id", eventId)
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (existing) {
    return { duplicate: true };
  }

  // Insert new event
  const { error: insertError } = await supabaseAdmin
    .from("paypal_events")
    .insert({ event_id: eventId, received_at: now, resource_id: resourceId });

  if (insertError) {
    return { success: false, error: insertError.message };
  }

  return { success: true };
}
