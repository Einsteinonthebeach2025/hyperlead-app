// import { NextResponse } from "next/server";
// import {
//   SUBSCRIPTION_PLANS,
//   EXTRA_LEADS_PLAN,
//   SINGLE_LEAD_PLAN,
// } from "app/lib/config/paypalConfig";

// export async function POST(req) {
//   console.log("==== PayPal VERIFY API called ====");

//   try {
//     const { orderID, planName } = await req.json();

//     // 1. Get Access Token
//     const auth = Buffer.from(
//       `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
//     ).toString("base64");

//     const tokenRes = await fetch(
//       `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Basic ${auth}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: "grant_type=client_credentials",
//       }
//     );

//     const tokenData = await tokenRes.json();
//     if (!tokenData.access_token) {
//       return NextResponse.json(
//         { error: "Failed to obtain PayPal access token" },
//         { status: 500 }
//       );
//     }

//     const accessToken = tokenData.access_token;

//     // 2. Fetch Order Details
//     const orderRes = await fetch(
//       `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await orderRes.json();
//     if (data.status !== "COMPLETED") {
//       return NextResponse.json(
//         { error: "Payment not completed" },
//         { status: 400 }
//       );
//     }

//     const purchaseUnit = data.purchase_units?.[0];
//     const amount = purchaseUnit?.amount?.value;

//     if (!amount) {
//       return NextResponse.json(
//         { error: "Invalid order data" },
//         { status: 500 }
//       );
//     }

//     // 3. Extract Payment Method Info
//     let paymentMethod = {
//       brand: "PAYPAL",
//       last4: "PAYPAL",
//       maskedCard: "PAYPAL",
//     };

//     const cardPayment = data.payment_source?.card;
//     if (cardPayment) {
//       const brand = cardPayment.brand?.toUpperCase() || "CARD";
//       const last4 = cardPayment.last_4_digits || "****";
//       paymentMethod = {
//         brand,
//         last4,
//         maskedCard: `${brand} / **** **** **** ${last4}`,
//       };
//     }

//     // 4. Match Plan
//     let plan;
//     if (planName === "EXTRA_100") {
//       plan = EXTRA_LEADS_PLAN;
//     } else if (planName === "SINGLE_LEAD") {
//       plan = SINGLE_LEAD_PLAN;
//     } else {
//       plan = SUBSCRIPTION_PLANS[planName?.toUpperCase()];
//     }

//     if (!plan) {
//       return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
//     }

//     if (amount !== plan.price) {
//       return NextResponse.json(
//         { error: "Payment amount mismatch" },
//         { status: 400 }
//       );
//     }

//     // 5. Extract Payer Billing Info
//     const payerData = data.payer || {};
//     const payerInfo = {
//       name: `${payerData.name?.given_name || ""} ${payerData.name?.surname || ""}`.trim(),
//       email: payerData.email_address || "",
//       address: payerData.address || {},
//     };

//     const captureId = data.purchase_units[0]?.payments?.captures[0]?.id;

//     // Fetch user-facing transaction ID from capture details
//     let userTransactionId = null;
//     if (captureId) {
//       const captureRes = await fetch(
//         `${process.env.PAYPAL_API_URL}/v2/payments/captures/${captureId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const captureData = await captureRes.json();
//       userTransactionId = captureData.id || null; // This is usually the user-facing transaction ID
//     }

//     // 6. Return to Frontend
//     return NextResponse.json({
//       success: true,
//       orderID: data.id,
//       plan: planName,
//       leads: plan.leads,
//       paymentMethod,
//       payerInfo,
//       captureId,
//       userTransactionId,
//     });
//   } catch (error) {
//     console.error("PayPal verification error:", error);
//     return NextResponse.json(
//       { error: "Payment verification failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import {
  SUBSCRIPTION_PLANS,
  EXTRA_LEADS_PLAN,
  SINGLE_LEAD_PLAN,
} from "app/lib/config/paypalConfig";

export async function POST(req) {
  console.log("=== PayPal VERIFY API called ===");

  try {
    const { orderID, planName } = await req.json();
    console.log("Step 1: Received orderID and planName:", {
      orderID,
      planName,
    });

    // Step 2: Get Access Token
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
      console.error("❌ Failed to get access token:", tokenData);
      return NextResponse.json(
        { error: "Failed to obtain PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;
    console.log("✅ Access token obtained");

    // Step 3: Get Order Details
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
    console.log("Step 4: Order details fetched:", data);

    if (data.status !== "COMPLETED") {
      console.warn("⚠️ Payment not completed:", data.status);
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const purchaseUnit = data.purchase_units?.[0];
    const amount = purchaseUnit?.amount?.value;
    if (!amount) {
      console.error("❌ Missing amount in order data");
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 500 }
      );
    }

    // Step 5: Extract Payment Method
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
    console.log("Step 5: Payment method extracted:", paymentMethod);

    // Step 6: Match plan
    let plan;
    if (planName === "EXTRA_100") {
      plan = EXTRA_LEADS_PLAN;
    } else if (planName === "SINGLE_LEAD") {
      plan = SINGLE_LEAD_PLAN;
    } else {
      plan = SUBSCRIPTION_PLANS[planName?.toUpperCase()];
    }

    if (!plan) {
      console.error("❌ Invalid plan:", planName);
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (amount !== plan.price) {
      console.error(
        "❌ Price mismatch: expected",
        plan.price,
        "but got",
        amount
      );
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    // Step 7: Extract payer billing info
    const payerData = data.payer || {};
    const payerInfo = {
      name: `${payerData.name?.given_name || ""} ${payerData.name?.surname || ""}`.trim(),
      email: payerData.email_address || "",
      address: payerData.address || {},
    };
    console.log("Step 7: Payer info extracted:", payerInfo);

    // Step 8: Extract captureId and user-facing transaction ID
    const captureId = purchaseUnit?.payments?.captures?.[0]?.id || null;
    const userTransactionId = captureId;
    console.log("Step 8: Transaction ID captured:", {
      captureId,
      userTransactionId,
    });

    // Step 9: Return to frontend
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
    console.error("💥 PayPal verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
