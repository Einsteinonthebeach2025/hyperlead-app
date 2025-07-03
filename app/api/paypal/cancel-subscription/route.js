import { NextResponse } from "next/server";

// Helper to get PayPal access token
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  const base64 = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req) {
  try {
    const { subscriptionId } = await req.json();
    const accessToken = await getPayPalAccessToken();

    const res = await fetch(
      `https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: "User requested cancellation" }),
      }
    );

    if (res.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const error = await res.json();
      return NextResponse.json({ success: false, error }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
