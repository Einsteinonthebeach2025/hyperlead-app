import { createServerClient } from "app/lib/config/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase.auth.mfa.listFactors();

  if (error) {
    console.error("Error listing MFA factors:", error);
    return NextResponse.json({ requires2FA: false });
  }

  const isMfaEnabled = data && data.totp && data.totp.length > 0;
  return NextResponse.json({ requires2FA: isMfaEnabled });
}
