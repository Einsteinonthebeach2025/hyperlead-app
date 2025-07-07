// route.js
// This file uses the Supabase service role key for all DB actions (bypasses RLS)
import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { NextResponse } from "next/server";
import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { createTransaction } from "app/lib/actions/transactionActions";
import { notifyRecurringPayment } from "app/lib/actions/notificationActions";

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

      // 1.  IDEMPOTENCY CHECK
      const { data: existingEvent, error: eventCheckError } =
        await supabaseAdmin
          .from("paypal_events")
          .select("id")
          .eq("event_id", eventId)
          .single();
      if (existingEvent) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
      await supabaseAdmin
        .from("paypal_events")
        .insert({ event_id: eventId, received_at: now });

      // 2. FIND USER BY SUBSCRIPTION_ID
      const { data: user, error: findError } = await supabaseAdmin
        .from("profiles")
        .select(
          "id, email, preferences, monthly_leads, leads_received_this_month, total_leads_received, subscription, subscription_status"
        )
        .eq("subscription_id", subscriptionId)
        .single();
      if (findError || !user) {
        return NextResponse.json(
          { error: "User not found for subscription_id" },
          { status: 404 }
        );
      }

      // 3. ASSIGN LEADS TO USER
      const leads = user.monthly_leads || 100;
      const assignResult = await assignLeadsToUser(
        user.id,
        user.email,
        user.preferences,
        leads,
        true,
        supabaseAdmin
      );
      if (!assignResult.success) {
        return NextResponse.json(
          { error: "Failed to assign leads" },
          { status: 500 }
        );
      }

      // 4. CREATE A RECURRING TRANSACTION
      const planName = user.subscription || "UNKNOWN";
      const transactionResult = await createTransaction(
        user.id,
        subscriptionId,
        planName,
        resource.agreement_details?.last_payment_amount?.value || 0,
        { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
        { name: user.email, email: user.email },
        null,
        supabaseAdmin,
        {
          recurring: true,
          renewal_timestamp: now,
        }
      );
      if (!transactionResult.success) {
        return NextResponse.json(
          { error: "Failed to create transaction" },
          { status: 500 }
        );
      }

      // 5. UPDATE USER PROFILE
      const updatedLeadsReceived =
        (user.leads_received_this_month || 0) + leads;
      const updatedTotalLeads = (user.total_leads_received || 0) + leads;
      const { error: updateProfileError } = await supabaseAdmin
        .from("profiles")
        .update({
          last_payment_date: now,
          last_notification_timestamp: null,
          last_leads_finished_notification: null,
          leads_received_this_month: updatedLeadsReceived,
          total_leads_received: updatedTotalLeads,
        })
        .eq("id", user.id);
      if (updateProfileError) {
        return NextResponse.json(
          { error: "Failed to update user profile" },
          { status: 500 }
        );
      }

      // 6. NOTIFY USER OF RECURRING PAYMENT
      const userName = user?.profile?.userName || user.email;
      const notifyResult = await notifyRecurringPayment(
        user.id,
        userName,
        planName,
        leads,
        supabaseAdmin
      );
      if (notifyResult.error) {
      } else {
        console.log(
          `[PayPal Webhook] Notified user of recurring payment:`,
          user.email
        );
      }
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
