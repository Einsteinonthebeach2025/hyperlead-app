import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { NextResponse } from "next/server";
import { handleInitialSubscription } from "app/lib/webhooks/initialSubscription";
import { handleRecurringPaymentCompleted } from "app/lib/webhooks/recurringCreated";

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
      console.log("2 BILLING.SSALE.COMPLETED fired");
      const resource = event.resource;
      const result = await handleRecurringPaymentCompleted(
        eventId,
        resource,
        supabaseAdmin
      );
      if (result.duplicate) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Unknown error" },
          { status: 500 }
        );
      }
      return NextResponse.json({ received: true, eventType }, { status: 200 });
    }

    if (eventType === "BILLING.SUBSCRIPTION.CREATED") {
      console.log("2 BILLING.SUBSCRIPTION.CREATED fired");
      const resource = event.resource;
      const result = await handleInitialSubscription(
        eventId,
        resource,
        supabaseAdmin
      );
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Unknown error" },
          { status: 500 }
        );
      }
      return NextResponse.json({ received: true, eventType }, { status: 200 });
    }

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      console.log("3 BILLING.SUBSCRIPTION.ACTIVATED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") {
      console.log("4 BILLING.SUBSCRIPTION.CANCELLED fired");
    }

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      console.log("4 PAYMENT.CAPTURE.COMPLETED fired");
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
