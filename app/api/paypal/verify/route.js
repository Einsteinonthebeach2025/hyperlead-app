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

    // 1. Get Access Token
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

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

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to obtain PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

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

    const data = await orderRes.json();
    if (data.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const purchaseUnit = data.purchase_units?.[0];
    const amount = purchaseUnit?.amount?.value;

    if (!amount) {
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

    // 4. Match Plan
    let plan;
    if (planName === "EXTRA_100") {
      plan = EXTRA_LEADS_PLAN;
    } else if (planName === "SINGLE_LEAD") {
      plan = SINGLE_LEAD_PLAN;
    } else {
      plan = SUBSCRIPTION_PLANS[planName?.toUpperCase()];
    }

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (amount !== plan.price) {
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

    const captureId = data.purchase_units[0]?.payments?.captures[0]?.id;

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
      userTransactionId = captureData.id || null; // This is usually the user-facing transaction ID
    }

    // 6. Return to Frontend
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
    console.error("PayPal verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
