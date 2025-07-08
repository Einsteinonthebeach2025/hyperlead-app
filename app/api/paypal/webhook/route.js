import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { NextResponse } from "next/server";
import { handleSubscriptionUpdated } from "app/lib/webhooks/update";

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

    if (eventType === "PAYMENT.SALE.COMPLETED") {
      console.log("1 PAYMENT.SALE.COMPLETED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.CREATED") {
      console.log("2 BILLING.SUBSCRIPTION.CREATED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      console.log("3 BILLING.SUBSCRIPTION.ACTIVATED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") {
      console.log("4 BILLING.SUBSCRIPTION.CANCELLED fired");
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
