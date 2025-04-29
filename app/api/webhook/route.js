import { createServerClient } from "app/lib/config/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    if (body.type === "email.opened") {
      const { messageId, recipient } = body.data;

      const supabase = await createServerClient();

      const { error } = await supabase
        .from("emails")
        .update({
          opened_at: new Date().toISOString(),
          status: "opened",
        })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);

      if (error) {
        console.error("Supabase update error:", error);
        return NextResponse.json({ error }, { status: 500 });
      }

      return NextResponse.json({ received: true }, { status: 200 });
    }

    return NextResponse.json({ ignored: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
