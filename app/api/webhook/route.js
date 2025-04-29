import { createServerClient } from "app/lib/config/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[WEBHOOK] Received body:", JSON.stringify(body, null, 2));
    const { type, data } = body;
    console.log(`[WEBHOOK] Event type: ${type}`);
    const supabase = await createServerClient();

    if (type === "email.opened") {
      const { messageId, recipient } = data || {};
      console.log(
        `[WEBHOOK] email.opened: messageId=${messageId}, recipient=${recipient}`
      );
      const { error } = await supabase
        .from("emails")
        .update({
          opened_at: new Date().toISOString(),
        })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);

      if (error) {
        console.error("[WEBHOOK] Supabase update error (opened):", error);
        return NextResponse.json({ error }, { status: 500 });
      }
      console.log("[WEBHOOK] email.opened updated successfully");
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (type === "email.delivered") {
      const { messageId, recipient } = data || {};
      console.log(
        `[WEBHOOK] email.delivered: messageId=${messageId}, recipient=${recipient}`
      );
      if (!messageId || !recipient) {
        console.error("[WEBHOOK] Missing messageId or recipient", {
          messageId,
          recipient,
        });
        return NextResponse.json(
          { error: "Missing messageId or recipient" },
          { status: 400 }
        );
      }
      const { error } = await supabase
        .from("emails")
        .update({
          delivered: true,
        })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);
      if (error) {
        console.error("[WEBHOOK] Supabase update error (delivered):", error);
        return NextResponse.json({ error }, { status: 500 });
      }
      console.log("[WEBHOOK] email.delivered updated successfully");
      return NextResponse.json({ received: true }, { status: 200 });
    }
    console.log("[WEBHOOK] Ignored event type:", type);
    return NextResponse.json({ ignored: true }, { status: 200 });
  } catch (error) {
    console.error("[WEBHOOK] Handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 00050c4c-7e05-40b1-8d71-bef6f6eeefdf  << am lids shevucvale emaili

//kenneth.collins@le-vel.com
