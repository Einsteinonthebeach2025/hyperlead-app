import { NextResponse } from "next/server";
import { createServerClient } from "app/lib/config/supabaseServer";

export async function POST(request) {
  try {
    const { token } = await request.json();
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const factorId = user.factors?.find(
      (f) => f.factor_type === "totp" && f.status === "verified"
    )?.id;

    if (!factorId) {
      return NextResponse.json(
        { verified: false, error: "No verified 2FA factor found." },
        { status: 400 }
      );
    }

    const { data, error: verifyError } =
      await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: token,
      });

    if (verifyError) {
      return NextResponse.json(
        { verified: false, error: verifyError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true, ...data });
  } catch (err) {
    console.error("2FA Payment Verification Error:", err);
    return NextResponse.json(
      { verified: false, error: "Invalid 2FA code or server error." },
      { status: 500 }
    );
  }
}
