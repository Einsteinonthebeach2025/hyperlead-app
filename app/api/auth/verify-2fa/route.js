import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "app/lib/config/supabaseServer";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export async function POST(request) {
  try {
    const { code } = await request.json();
    const cookieStore = cookies();
    const supabase = await createServerClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { user } = session;

    // ✅ Use "factors" not "amr"!
    const factorId = user.factors?.find(
      (factor) => factor.factor_type === "totp" && factor.status === "verified"
    )?.id;

    if (!factorId) {
      return NextResponse.json(
        { error: "2FA not fully set up or factor not found." },
        { status: 400 }
      );
    }

    // Start challenge
    await supabase.auth.mfa.challenge({ factorId });

    // Verify provided code
    await supabase.auth.mfa.verify({ factorId, code });

    // Trusted device token generation
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(token);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days trust

    const { error: dbError } = await supabase.from("trusted_devices").insert({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    });

    if (dbError) {
      console.error("Error saving trusted device:", dbError);
    } else {
      cookieStore.set("trusted_device_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
        sameSite: "lax",
      });
    }

    return NextResponse.json({ message: "2FA verification successful." });
  } catch (err) {
    console.error("2FA Verification Error:", err);
    return NextResponse.json(
      { error: "Invalid 2FA code or server error." },
      { status: 401 }
    );
  }
}
