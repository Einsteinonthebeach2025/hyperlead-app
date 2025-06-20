import { NextResponse } from "next/server";
import {
  SUBSCRIPTION_PLANS,
  EXTRA_LEADS_PLAN,
} from "app/lib/config/paypalConfig";

export async function POST(req) {
  console.log("==== PayPal VERIFY API called ====");
  try {
    const { orderID, planName } = await req.json();

    // Debugging (Optional):
    console.log("PayPal Client ID:", process.env.PAYPAL_CLIENT_ID);
    console.log("PayPal Secret:", process.env.PAYPAL_SECRET);
    console.log("PayPal API URL:", process.env.PAYPAL_API_URL);

    // Get PayPal access token
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
      console.error("Token Response:", tokenData);
      return NextResponse.json(
        { error: "Failed to obtain PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    // Verify order details
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

    if (
      !data.purchase_units ||
      !Array.isArray(data.purchase_units) ||
      !data.purchase_units[0]?.amount?.value
    ) {
      return NextResponse.json(
        { error: "Invalid PayPal order data" },
        { status: 500 }
      );
    }
    const amount = data.purchase_units[0].amount.value;

    // Verify amount matches plan
    let plan;
    if (planName === "EXTRA_100") {
      plan = EXTRA_LEADS_PLAN;
    } else {
      plan = SUBSCRIPTION_PLANS[planName.toUpperCase()];
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

    return NextResponse.json({
      success: true,
      orderID: data.id,
      plan: planName,
      leads: plan.leads,
    });
  } catch (error) {
    console.error("PayPal verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
