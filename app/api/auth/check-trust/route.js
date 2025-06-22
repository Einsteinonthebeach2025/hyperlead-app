import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "app/lib/config/supabaseServer";

export async function POST() {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const { user } = session;
    // 1. Check 2FA via factors (not amr)
    const factors = user.factors || [];
    const has2FA = factors.some(
      (factor) => factor.factor_type === "totp" && factor.status === "verified"
    );
    if (!has2FA) {
      // User has no 2FA — skip modal
      return NextResponse.json({ trusted: true, "2fa_required": false });
    }
    // 2. Check for trusted device token
    const trustedToken = cookieStore.get("trusted_device_token")?.value;
    if (!trustedToken) {
      return NextResponse.json({ trusted: false, "2fa_required": true });
    }
    const hashToken = (token) =>
      crypto.createHash("sha256").update(token).digest("hex");

    const hashedToken = hashToken(trustedToken);

    const { data: device, error: deviceError } = await supabase
      .from("trusted_devices")
      .select("user_id, expires_at")
      .eq("token_hash", hashedToken)
      .eq("user_id", user.id)
      .single();

    if (deviceError) {
      console.error("Trusted device lookup error:", deviceError);
      return NextResponse.json({ trusted: false, "2fa_required": true });
    }

    if (!device || new Date(device.expires_at) < new Date()) {
      return NextResponse.json({ trusted: false, "2fa_required": true });
    }

    // Trusted device and valid
    return NextResponse.json({ trusted: true, "2fa_required": false });
  } catch (err) {
    console.error("Check-trust route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
