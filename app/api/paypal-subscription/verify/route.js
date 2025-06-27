import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { subscriptionID, planName } = await req.json();

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

    const { access_token } = await tokenRes.json();
    if (!access_token) throw new Error("PayPal token failed");

    const subRes = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionID}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const subData = await subRes.json();

    if (subData.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Subscription not active" },
        { status: 400 }
      );
    }

    // You can extract payer info, next billing time, etc. here

    return NextResponse.json({
      success: true,
      plan: planName,
      subscriptionID,
      payerInfo: subData.subscriber,
    });
  } catch (err) {
    console.error("PayPal Subscription Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
