import { createAdminClient } from "app/lib/config/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const eventType = body.type;
    const messageId = body.data?.email_id;

    if (
      !messageId ||
      !["email.delivered", "email.opened"].includes(eventType)
    ) {
      return new Response("Ignored", { status: 200 });
    }

    const supabase = createAdminClient();

    const updateFields = {};
    if (eventType === "email.delivered") {
      updateFields.delivered = true;
    }
    if (eventType === "email.opened") {
      updateFields.opened_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("emails")
      .update(updateFields)
      .eq("resend_message_id", messageId);

    if (error) {
      console.error("Supabase update error:", error);
      return new Response("Error updating email status", { status: 500 });
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
