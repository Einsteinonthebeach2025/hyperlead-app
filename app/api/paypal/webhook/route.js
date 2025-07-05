// route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use server-side Supabase admin client
const supabase = createClient(
  process.env.SUPABASE_URL, // Use the admin URL, not NEXT_PUBLIC
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper: Parse raw body (for signature verification, if you add it later)
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
