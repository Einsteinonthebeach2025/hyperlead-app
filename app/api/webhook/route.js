// import { NextResponse } from "next/server";
// import { createServerClient } from "app/lib/config/supabaseServer";

// const WEBHOOK_SECRET =
//   process.env.RESEND_WEBHOOK_SECRET || "whsec_+nD/EMWZWEzITuBCcasSfdq8nNLWPhLu";

// export async function POST(req) {
//   try {
//     const signature = req.headers.get("x-resend-signature");
//     const body = await req.text();
//     let event;
//     try {
//       event = JSON.parse(body);
//     } catch (err) {
//       return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//     }
//     const { type, data } = event;
//     if (!type || !data) {
//       return NextResponse.json(
//         { error: "Missing type or data" },
//         { status: 400 }
//       );
//     }

//     if (type === "email.delivered") {
//       const messageId = data.email_id;
//       const recipient = Array.isArray(data.to) ? data.to[0] : data.to;
//       if (!messageId || !recipient) {
//         console.error(
//           "[Webhook] Missing messageId or recipient in delivered event",
//           { messageId, recipient }
//         );
//         return NextResponse.json(
//           { error: "Missing messageId or recipient" },
//           { status: 400 }
//         );
//       }
//       const supabase = await createServerClient();
//       const { error } = await supabase
//         .from("emails")
//         .update({ delivered: true })
//         .eq("leads_email", recipient)
//         .eq(
//           "resend_message_id",
//           messageId ? messageId.toString().trim() : null
//         );
//       if (error) {
//         return NextResponse.json({ error }, { status: 500 });
//       }
//       return NextResponse.json({ received: true }, { status: 200 });
//     }
//     return NextResponse.json({ ignored: true }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { createServerClient } from "app/lib/config/supabaseServer";

// export async function POST(req) {
//   try {
//     const signature = req.headers.get("x-resend-signature"); // optionally verify this if needed
//     const body = await req.text();

//     let event;
//     try {
//       event = JSON.parse(body);
//     } catch (err) {
//       return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//     }

//     const { type, data } = event;

//     if (!type || !data) {
//       return NextResponse.json(
//         { error: "Missing type or data" },
//         { status: 400 }
//       );
//     }

//     const supabase = await createServerClient();

//     // Handle delivery confirmation
//     if (type === "email.delivered") {
//       const messageId = data.email_id; // This should match `resend_message_id` in DB
//       const recipient = Array.isArray(data.to) ? data.to[0] : data.to;

//       if (!messageId || !recipient) {
//         console.error("[Webhook] Missing messageId or recipient", {
//           messageId,
//           recipient,
//         });
//         return NextResponse.json(
//           { error: "Missing messageId or recipient" },
//           { status: 400 }
//         );
//       }

//       const { error: updateError } = await supabase
//         .from("emails")
//         .update({ delivered: true, updated_at: new Date().toISOString() })
//         .eq("resend_message_id", messageId)
//         .eq("leads_email", recipient);

//       if (updateError) {
//         console.error("[Webhook] Supabase update error", updateError);
//         return NextResponse.json(
//           { error: "Database update failed" },
//           { status: 500 }
//         );
//       }

//       return NextResponse.json({ delivered: true });
//     }

//     // Optionally handle open events
//     if (type === "email.opened") {
//       const messageId = data.email_id;
//       const { error: openError } = await supabase
//         .from("emails")
//         .update({
//           opened_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         })
//         .eq("resend_message_id", messageId);

//       if (openError) {
//         console.error("[Webhook] Supabase open update error", openError);
//         return NextResponse.json(
//           { error: "Failed to update open" },
//           { status: 500 }
//         );
//       }

//       return NextResponse.json({ opened: true });
//     }

//     // For other webhook types
//     return NextResponse.json({ ignored: true });
//   } catch (error) {
//     console.error("[Webhook] Unexpected error", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// app/api/webhook/route.js
import { createServerClient } from "@/config/supabaseServer";

export async function POST(req) {
  try {
    const body = await req.json();
    const eventType = body.type;
    const messageId = body.data?.email_id; // <-- FIXED

    if (
      !messageId ||
      !["email.delivered", "email.opened"].includes(eventType)
    ) {
      return new Response("Ignored", { status: 200 });
    }

    const supabase = await createServerClient();

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
