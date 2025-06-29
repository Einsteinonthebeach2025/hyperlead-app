import { NextResponse } from "next/server";
import {
  SUBSCRIPTION_PLANS,
  EXTRA_LEADS_PLAN,
  SINGLE_LEAD_PLAN,
} from "app/lib/config/paypalConfig";

export async function POST(req) {
  console.log("==== PayPal VERIFY API called ====");

  try {
    const { orderID, planName } = await req.json();
    console.log("[Step 1] Received orderID and planName:", {
      orderID,
      planName,
    });

    // 1. Get Access Token
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");
    console.log("[Step 2] Generated Basic Auth for PayPal");

    const tokenRes = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );
    console.log("[Step 3] Requested PayPal access token");

    const tokenData = await tokenRes.json();
    console.log("[Step 4] PayPal token response:", tokenData);
    if (!tokenData.access_token) {
      console.error("[Error] Failed to obtain PayPal access token", tokenData);
      return NextResponse.json(
        { error: "Failed to obtain PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;
    console.log("[Step 5] Access token obtained:", accessToken);

    // 2. Fetch Order Details
    const orderRes = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("[Step 6] Requested order details for orderID:", orderID);

    const data = await orderRes.json();
    console.log("[Step 7] Order details fetched:", data);
    if (data.status !== "COMPLETED") {
      console.warn("[Warn] Payment not completed:", data.status);
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const purchaseUnit = data.purchase_units?.[0];
    const amount = purchaseUnit?.amount?.value;
    console.log("[Step 8] Purchase unit and amount:", purchaseUnit, amount);

    if (!amount) {
      console.error("[Error] Invalid order data, missing amount");
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 500 }
      );
    }

    // 3. Extract Payment Method Info
    let paymentMethod = {
      brand: "PAYPAL",
      last4: "PAYPAL",
      maskedCard: "PAYPAL",
    };

    const cardPayment = data.payment_source?.card;
    if (cardPayment) {
      const brand = cardPayment.brand?.toUpperCase() || "CARD";
      const last4 = cardPayment.last_4_digits || "****";
      paymentMethod = {
        brand,
        last4,
        maskedCard: `${brand} / **** **** **** ${last4}`,
      };
    }
    console.log("[Step 9] Payment method extracted:", paymentMethod);

    // 4. Match Plan
    let plan;
    if (planName === "EXTRA_100") {
      plan = EXTRA_LEADS_PLAN;
    } else if (planName === "SINGLE_LEAD") {
      plan = SINGLE_LEAD_PLAN;
    } else {
      plan = SUBSCRIPTION_PLANS[planName?.toUpperCase()];
    }
    console.log("[Step 10] Matched plan:", plan);

    if (!plan) {
      console.error("[Error] Invalid plan:", planName);
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (amount !== plan.price) {
      console.error(
        "[Error] Payment amount mismatch. Expected:",
        plan.price,
        "Got:",
        amount
      );
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    // 5. Extract Payer Billing Info
    const payerData = data.payer || {};
    const payerInfo = {
      name: `${payerData.name?.given_name || ""} ${payerData.name?.surname || ""}`.trim(),
      email: payerData.email_address || "",
      address: payerData.address || {},
    };
    console.log("[Step 11] Payer info:", payerInfo);

    const captureId = data.purchase_units[0]?.payments?.captures[0]?.id;
    console.log("[Step 12] Capture ID:", captureId);

    // Fetch user-facing transaction ID from capture details
    let userTransactionId = null;
    if (captureId) {
      const captureRes = await fetch(
        `${process.env.PAYPAL_API_URL}/v2/payments/captures/${captureId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const captureData = await captureRes.json();
      console.log("[Step 13] Capture details:", captureData);
      userTransactionId = captureData.id || null; // This is usually the capture_id, not the buyer-facing ID
      console.log(
        "[Step 14] userTransactionId (should be capture_id):",
        userTransactionId
      );
    }

    // 6. Return to Frontend
    console.log("[Step 15] Returning response to frontend", {
      orderID: data.id,
      plan: planName,
      leads: plan.leads,
      paymentMethod,
      payerInfo,
      captureId,
      userTransactionId,
    });
    return NextResponse.json({
      success: true,
      orderID: data.id,
      plan: planName,
      leads: plan.leads,
      paymentMethod,
      payerInfo,
      captureId,
      userTransactionId,
    });
  } catch (error) {
    console.error("[Error] PayPal verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
