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
      const lastPaymentDate = resource.agreement_details?.last_payment_date;
      const lastPaymentAmount =
        resource.agreement_details?.last_payment_amount?.value;
      const payerInfo = resource.payer?.payer_info;

      console.log(`[Recurring] Subscription ID:`, subscriptionId);
      console.log(`[Recurring] Last Payment Date:`, lastPaymentDate);
      console.log(`[Recurring] Last Payment Amount:`, lastPaymentAmount);
      console.log(`[Recurring] Payer Info:`, payerInfo);

      // Simulate lookup
      const { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("subscription_id", subscriptionId)
        .single();

      if (!user) {
        console.error(
          "[Recurring] No user found for subscription:",
          subscriptionId
        );
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Prevent duplicate processing
      if (lastPaymentDate === user.last_payment_date) {
        console.log("[Recurring] Duplicate payment event — skipping.");
        return NextResponse.json({ status: "duplicate_skipped" });
      }

      // Process logic
      const leadsToAssign = user.subscription_plan === "HYPER" ? 800 : 0;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          leads: (user.leads || 0) + leadsToAssign,
          last_payment_date: lastPaymentDate,
        })
        .eq("id", user.id);

      if (updateError) {
        console.error("[Recurring] Failed to assign leads:", updateError);
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 }
        );
      }

      // Optionally log or save transaction
      console.log(
        `[Recurring] Assigned ${leadsToAssign} new leads to ${user.email}`
      );
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

// Simulate a fake recurring payment (optional, dev only)
export async function GET() {
  console.log("HELLO FROM PAYPAL WEBHOOK");

  const simulate = true; // flip to false to disable

  if (simulate) {
    setTimeout(async () => {
      console.log("🔁 Simulating recurring payment...");

      const fakeEvent = {
        event_type: "BILLING.SUBSCRIPTION.UPDATED",
        resource: {
          id: "I-N8KU4F580KPM", // your real subscription ID
          agreement_details: {
            last_payment_date: new Date().toISOString(),
            last_payment_amount: { value: "0.02" },
          },
          payer: {
            payer_info: {
              email: "sandboxuser@example.com",
              payer_id: "TESTPAYERID",
            },
          },
        },
      };

      await POST({
        text: async () => JSON.stringify(fakeEvent),
      });
    }, 3000);
  }

  return NextResponse.json({
    message: "Webhook is working and simulation has started",
  });
}
