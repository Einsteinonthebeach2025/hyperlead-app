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
