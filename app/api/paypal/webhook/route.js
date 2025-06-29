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

export async function GET() {
  console.log("hello from paypal webhook [GET]");
  return NextResponse.json({ message: "Webhook GET test OK" });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📩 PayPal Webhook Event:", JSON.stringify(body, null, 2));

    const eventType = body.event_type;
    const resource = body.resource;

    // Listen for the payment capture completed event
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const transactionId = resource.id; // This is the user-facing transaction ID
      const orderId = resource?.supplementary_data?.related_ids?.order_id;

      console.log("✅ Captured Transaction ID (user-facing):", transactionId);
      console.log("↪️ Related Order ID:", orderId);

      if (orderId && transactionId) {
        const { data, error } = await supabase
          .from("transactions")
          .update({ user_transaction_id: transactionId })
          .eq("order_id", orderId);

        if (error) {
          console.error("❌ Supabase update failed:", error);
        } else {
          console.log("✅ Transaction ID updated in DB:", data);
        }
      }
    }

    // Optionally handle other events
    if (eventType.startsWith("BILLING.SUBSCRIPTION.")) {
      console.log("ℹ️ Subscription Event:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
