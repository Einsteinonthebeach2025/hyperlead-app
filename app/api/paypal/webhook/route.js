// route.js
// This file uses the Supabase service role key for all DB actions (bypasses RLS)
import { NextResponse } from "next/server";
import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { notifyUserOnRecurringPayment } from "app/lib/actions/notificationActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import supabaseAdmin from "app/lib/config/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  let body = "";
  try {
    body = await req.text();
    const event = JSON.parse(body);
    const eventType = event.event_type;
    const eventId = event.id;
    console.log(`[PayPal Webhook] Event received: ${eventType}`);
    console.log(`[PayPal Webhook] Event ID: ${eventId}`);
    console.log(`[PayPal Webhook] Full event body:`, event);

    if (eventType === "BILLING.SUBSCRIPTION.UPDATED") {
      const resource = event.resource;
      const subscriptionId = resource.id;
      const now = new Date().toISOString();
      console.log(
        `[PayPal Webhook] [Recurring Payment] Subscription ID:`,
        subscriptionId
      );

      // Idempotency check (optional):
      const { data: existingEvent, error: eventCheckError } =
        await supabaseAdmin
          .from("paypal_events")
          .select("id")
          .eq("event_id", eventId)
          .single();
      if (existingEvent) {
        console.log(
          `[PayPal Webhook] Duplicate event received, skipping processing. Event ID: ${eventId}`
        );
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
      // Store event id to prevent reprocessing
      await supabaseAdmin
        .from("paypal_events")
        .insert({ event_id: eventId, received_at: now });

      // 1. Find user by subscription_id
      const { data: user, error: findError } = await supabaseAdmin
        .from("profiles")
        .select(
          "id, email, preferences, monthly_leads, leads_received_this_month, subscription, subscription_status"
        )
        .eq("subscription_id", subscriptionId)
        .single();
      if (findError || !user) {
        console.error(
          `[PayPal Webhook] [Recurring Payment] User not found for subscription_id:`,
          subscriptionId
        );
        return NextResponse.json(
          { error: "User not found for subscription_id" },
          { status: 404 }
        );
      }
      console.log(`[PayPal Webhook] User found:`, user.email, user.id);

      // 2. Get user's plan (assume plan info is in user.subscription or map from plan name)
      const leads = user.monthly_leads || 100;
      const planName = user.subscription || "UNKNOWN";
      console.log(
        `[PayPal Webhook] Plan: ${planName}, Leads to assign: ${leads}`
      );

      // 3. Assign leads
      const assignResult = await assignLeadsToUser(
        user.id,
        user.email,
        user.preferences,
        leads,
        true,
        supabaseAdmin
      );
      if (!assignResult.success) {
        console.error(
          `[PayPal Webhook] Failed to assign leads:`,
          assignResult.error
        );
        return NextResponse.json(
          { error: "Failed to assign leads" },
          { status: 500 }
        );
      }
      console.log(
        `[PayPal Webhook] Assigned ${leads} leads to user ${user.email}`
      );

      // 4. Update profile fields
      const updates = {
        monthly_leads: leads,
        leads_received_this_month:
          (user.leads_received_this_month || 0) + leads,
        last_notification_timestamp: null,
        last_leads_finished_notification: null,
        last_payment_date: now,
      };
      const { error: updateError } = await updateProfile(user.id, updates);
      if (updateError) {
        console.error(
          `[PayPal Webhook] Failed to update profile:`,
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update profile" },
          { status: 500 }
        );
      }
      console.log(`[PayPal Webhook] Updated profile for user ${user.email}`);

      // 5. Create a new transaction row for this renewal
      const transactionResult = await createTransaction(
        user.id,
        subscriptionId,
        planName,
        resource.billing_info?.last_payment?.amount?.value || 0,
        { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
        { name: user.email, email: user.email },
        null // captureId not available for recurring
      );
      if (!transactionResult.success) {
        console.error(
          `[PayPal Webhook] Failed to create transaction:`,
          transactionResult.error
        );
        return NextResponse.json(
          { error: "Failed to create transaction" },
          { status: 500 }
        );
      }
      console.log(
        `[PayPal Webhook] Created transaction for user ${user.email}`
      );

      // 6. Send notification
      await notifyUserOnRecurringPayment(user.id, leads);
      console.log(
        `[PayPal Webhook] Sent recurring payment notification to user ${user.email}`
      );
    }

    return NextResponse.json({ received: true, eventType }, { status: 200 });
  } catch (err) {
    console.error("[PayPal Webhook] Error parsing event:", err, body);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

export async function GET() {
  console.log("HELLO FROM LIVE PAYPAL WEBHOOK (is working)");
  return NextResponse.json({
    message: "HELLO FROM LIVE PAYPAL WEBHOOK (is working)",
  });
}
