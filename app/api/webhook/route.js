import { NextResponse } from "next/server";
import { createServerClient } from "app/lib/config/supabaseServer";

const WEBHOOK_SECRET =
  process.env.RESEND_WEBHOOK_SECRET || "whsec_+nD/EMWZWEzITuBCcasSfdq8nNLWPhLu";

export async function POST(req) {
  try {
    const signature = req.headers.get("x-resend-signature");
    const body = await req.text();
    console.log("[Webhook] Raw body:", body);
    console.log("[Webhook] Signature:", signature);

    // Optionally: verify signature here (implement if needed)
    // For now, just log and proceed

    let event;
    try {
      event = JSON.parse(body);
    } catch (err) {
      console.error("[Webhook] Failed to parse JSON:", err);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    console.log("[Webhook] Event received:", event);

    const { type, data } = event;
    if (!type || !data) {
      console.error("[Webhook] Missing type or data");
      return NextResponse.json(
        { error: "Missing type or data" },
        { status: 400 }
      );
    }

    if (type === "email.delivered") {
      const { messageId, recipient } = data;
      if (!messageId || !recipient) {
        console.error(
          "[Webhook] Missing messageId or recipient in delivered event"
        );
        return NextResponse.json(
          { error: "Missing messageId or recipient" },
          { status: 400 }
        );
      }
      const supabase = await createServerClient();
      const { error } = await supabase
        .from("emails")
        .update({ delivered: true })
        .eq("leads_email", recipient)
        .eq("resend_message_id", messageId);
      if (error) {
        console.error("[Webhook] Supabase update error (delivered):", error);
        return NextResponse.json({ error }, { status: 500 });
      }
      console.log("[Webhook] Email marked as delivered for:", {
        recipient,
        messageId,
      });
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Optionally handle other event types (e.g., email.opened)

    return NextResponse.json({ ignored: true }, { status: 200 });
  } catch (error) {
    console.error("[Webhook] Handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
