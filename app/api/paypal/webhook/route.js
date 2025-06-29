import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Required for raw body parsing for signature validation (you can add later)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("📩 PayPal Webhook Event:", JSON.stringify(body, null, 2));

    const eventType = body.event_type;
    const resource = body.resource;

    // ✅ Handle the real transaction ID from completed capture
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const transactionId = resource.id; // this is the user-facing TX ID (e.g., 95T263805R298640T)
      const orderId = resource?.supplementary_data?.related_ids?.order_id;

      console.log("✅ Captured Transaction ID:", transactionId);
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

    // Handle other billing/subscription events if needed
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

export async function GET() {
  return NextResponse.json({ message: "Webhook GET test OK" });
}
