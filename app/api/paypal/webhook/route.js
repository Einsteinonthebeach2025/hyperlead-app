// route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
    console.log(`[PayPal Webhook] Event received: ${eventType}`);
    console.log(`[PayPal Webhook] Full event body:`, event);

    if (eventType === "BILLING.SUBSCRIPTION.UPDATED") {
      const resource = event.resource;
      const subscriptionId = resource.id;
      const lastPaymentDate = resource.agreement_details?.last_payment_date;
      const lastPaymentAmount =
        resource.agreement_details?.last_payment_amount?.value;
      const payerInfo = resource.payer?.payer_info;

      console.log(
        `[PayPal Webhook] [Recurring Payment] Subscription ID:`,
        subscriptionId
      );
      console.log(
        `[PayPal Webhook] [Recurring Payment] Last Payment Date:`,
        lastPaymentDate
      );
      console.log(
        `[PayPal Webhook] [Recurring Payment] Last Payment Amount:`,
        lastPaymentAmount
      );
      console.log(
        `[PayPal Webhook] [Recurring Payment] Payer Info:`,
        payerInfo
      );

      // TODO: Find user in your DB by subscriptionId
      // TODO: Check if lastPaymentDate is new (not already processed)
      // TODO: If new, credit leads, create transaction, notify user
    }

    // Add more logic here for each event type as needed
    // Example:
    // if (eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") { ... }

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
