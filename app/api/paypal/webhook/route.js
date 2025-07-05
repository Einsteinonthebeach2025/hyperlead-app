// route.js
import { NextResponse } from "next/server";

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

  // Simulate recurring payment for subscription I-970SBSRWW6TS
  console.log(
    "[PayPal Webhook] [SIMULATION] Starting recurring payment simulation..."
  );

  setTimeout(() => {
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 1: Creating mock BILLING.SUBSCRIPTION.UPDATED event"
    );

    const mockEvent = {
      event_type: "BILLING.SUBSCRIPTION.UPDATED",
      resource: {
        id: "I-970SBSRWW6TS",
        agreement_details: {
          last_payment_date: new Date().toISOString(),
          last_payment_amount: {
            value: "0.02",
          },
        },
        payer: {
          payer_info: {
            email: "test@example.com",
            first_name: "Test",
            last_name: "User",
          },
        },
      },
    };

    console.log(
      "[PayPal Webhook] [SIMULATION] Step 2: Mock event created:",
      mockEvent
    );
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 3: Subscription ID from event:",
      mockEvent.resource.id
    );
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 4: Last Payment Date:",
      mockEvent.resource.agreement_details.last_payment_date
    );
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 5: Last Payment Amount:",
      mockEvent.resource.agreement_details.last_payment_amount.value
    );
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 6: Payer Info:",
      mockEvent.resource.payer.payer_info
    );

    console.log(
      "[PayPal Webhook] [SIMULATION] Step 7: Ready to process recurring payment for subscription I-970SBSRWW6TS"
    );
    console.log(
      "[PayPal Webhook] [SIMULATION] Step 8: Next steps - Find user by subscription ID, check if payment is new, credit leads, create transaction"
    );
  }, 2000); // 2 second delay to simulate processing

  return NextResponse.json({
    message: "HELLO FROM LIVE PAYPAL WEBHOOK (is working)",
    simulation:
      "Recurring payment simulation started for subscription I-970SBSRWW6TS",
  });
}
