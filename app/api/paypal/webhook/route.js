import { NextResponse } from "next/server";
import { handleRecurringPaymentCompleted } from "app/lib/webhooks/recurringCreated";
import { handleBillingSubscriptionFailed } from "app/lib/webhooks/billingSubscriptionFailed";
import { handlePaymentSaleDenied } from "app/lib/webhooks/paymentSaleDenied";
import { handleBillingSubscriptionCancelled } from "app/lib/webhooks/billingSubscriptionCancelled";
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

    if (eventType === "PAYMENT.SALE.COMPLETED") {
      console.log(
        `[Webhook] PAYMENT.SALE.COMPLETED received. eventId: ${eventId}`
      );
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

    if (eventType === "PAYMENT.SALE.DENIED") {
      console.log(
        `[Webhook] PAYMENT.SALE.DENIED received. eventId: ${eventId}`
      );
      const resource = event.resource;
      const result = await handlePaymentSaleDenied(
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

    if (eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") {
      console.log(
        `[Webhook] BILLING.SUBSCRIPTION.PAYMENT.FAILED received. eventId: ${eventId}`
      );
      const resource = event.resource;
      const result = await handleBillingSubscriptionFailed(
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

    if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") {
      console.log(
        `[Webhook] BILLING.SUBSCRIPTION.CANCELLED received. eventId: ${eventId}`
      );
      const resource = event.resource;
      const result = await handleBillingSubscriptionCancelled(
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
