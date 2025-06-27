// route.js
import { NextResponse } from "next/server";

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
    // Parse JSON body
    const body = await req.json();

    // Log the event for debugging (check Vercel logs)
    console.log("PayPal Webhook Event:", JSON.stringify(body, null, 2));

    const eventType = body.event_type;
    const resource = body.resource;

    // Example: Handle subscription payment succeeded (auto-renewal)
    if (eventType === "BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED") {
      const subscriptionId = resource.id;
      const nextBillingTime = resource.billing_info?.next_billing_time;

      // TODO: Lookup user by subscriptionId, update subscription_timestamp in DB
      // await updateUserSubscription(subscriptionId, nextBillingTime);

      console.log(
        `Payment succeeded for subscription ${subscriptionId}. Next billing: ${nextBillingTime}`
      );
    }

    // Handle other events as needed
    // if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") { ... }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
