"use server";
import { Resend } from "resend";
import { createServerClient } from "../config/supabaseServer";
import generateEmailHTML from "app/helpers/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  user_id,
  email,
  lead_id,
  lead_email,
  subject,
  message,
}) {
  console.log("[sendEmail] Input:", {
    user_id,
    email,
    lead_id,
    lead_email,
    subject,
    message,
  });
  try {
    const htmlContent = generateEmailHTML(subject, message);
    const { data: emailData } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: lead_email,
      subject,
      html: htmlContent,
    });
    console.log("[sendEmail] Resend response:", emailData);
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("emails")
      .insert({
        user_id,
        email,
        lead_id,
        leads_email: lead_email,
        subject,
        message,
        status: "sent",
        sent_at: new Date().toISOString(),
        resend_message_id: emailData?.id,
      })
      .select()
      .single();

    if (error) {
      console.error("[sendEmail] Supabase insert error:", error);
      throw error;
    }
    console.log("[sendEmail] Successfully inserted email record:", data);
    return { success: true, data };
  } catch (error) {
    console.error("[sendEmail] Error:", error);
    return { success: false, error: error.message };
  }
}
