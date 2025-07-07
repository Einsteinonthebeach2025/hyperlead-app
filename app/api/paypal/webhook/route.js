// route.js
// This file uses the Supabase service role key for all DB actions (bypasses RLS)
import supabaseAdmin from "app/lib/config/supabaseAdmin";
import { NextResponse } from "next/server";
import { handleSubscriptionUpdated } from "app/lib/webhooks/update";
import {
  handleSubscriptionCreated,
  handlePaymentCaptureCompleted,
} from "app/lib/webhooks/create";

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

    if (eventType === "BILLING.SUBSCRIPTION.CREATED") {
      const result = await handleSubscriptionCreated(
        eventId,
        event.resource,
        supabaseAdmin
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          {
            status:
              result.error === "User not found for subscription_id" ? 404 : 500,
          }
        );
      }

      if (result.duplicate) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
    }

    if (eventType === "BILLING.SUBSCRIPTION.UPDATED") {
      const result = await handleSubscriptionUpdated(
        eventId,
        event.resource,
        supabaseAdmin
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          {
            status:
              result.error === "User not found for subscription_id" ? 404 : 500,
          }
        );
      }

      if (result.duplicate) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
    }

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      const result = await handleSubscriptionCreated(
        eventId,
        event.resource,
        supabaseAdmin
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          {
            status:
              result.error === "User not found for subscription_id" ? 404 : 500,
          }
        );
      }

      if (result.duplicate) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
    }

    // if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    //   const result = await handlePaymentCaptureCompleted(
    //     eventId,
    //     event.resource,
    //     supabaseAdmin
    //   );

    //   if (!result.success) {
    //     return NextResponse.json(
    //       { error: result.error },
    //       {
    //         status: result.error === "User not found for order_id" ? 404 : 500,
    //       }
    //     );
    //   }

    //   if (result.duplicate) {
    //     return NextResponse.json(
    //       { received: true, duplicate: true },
    //       { status: 200 }
    //     );
    //   }
    // }

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
