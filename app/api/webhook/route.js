import { createServerClient } from "app/lib/config/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, data } = body;
    const supabase = await createServerClient();

    if (type === "email.opened") {
      const { messageId, recipient } = data;
      const { error } = await supabase
        .from("emails")
        .update({
          opened_at: new Date().toISOString(),
        })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);

      if (error) {
        console.error("Supabase update error (opened):", error);
        return NextResponse.json({ error }, { status: 500 });
      }
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (type === "email.delivered") {
      const { messageId, recipient } = data;
      const { error } = await supabase
        .from("emails")
        .update({
          delivered: true,
        })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);
      if (error) {
        console.error("Supabase update error (delivered):", error);
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

// 00050c4c-7e05-40b1-8d71-bef6f6eeefdf  << am lids shevucvale emaili

//kenneth.collins@le-vel.com
