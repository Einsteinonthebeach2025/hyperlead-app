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
      const now = new Date().toISOString();
      console.log(
        `[PayPal Webhook] [Recurring Payment] Subscription ID:`,
        subscriptionId
      );
      console.log(
        `[PayPal Webhook] [Recurring Payment] Updating last_payment_date for user with this subscription ID...`
      );
      // Find user by subscription_id and update last_payment_date
      const { data: user, error: findError } = await supabase
        .from("profiles")
        .select("id, email, last_payment_date")
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
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ last_payment_date: now })
        .eq("id", user.id);
      if (updateError) {
        console.error(
          `[PayPal Webhook] [Recurring Payment] Failed to update last_payment_date for user:`,
          user.id,
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update last_payment_date" },
          { status: 500 }
        );
      }
      console.log(
        `[PayPal Webhook] [Recurring Payment] Successfully updated last_payment_date for user:`,
        user.email,
        now
      );
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
