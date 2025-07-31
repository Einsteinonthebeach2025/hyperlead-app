import { NextResponse } from "next/server";
import { sendSubscriptionExpiredEmail } from "app/lib/actions/emailActions";

export async function POST(req) {
  try {
    const { userName, email, subscriptionType, expired_at } = await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Send the expired subscription email
    const result = await sendSubscriptionExpiredEmail({
      userName,
      email,
      subscriptionType,
      expired_at,
    });

    if (result.success) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending expired subscription email:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
