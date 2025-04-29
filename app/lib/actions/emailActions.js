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
        resend_message_id: emailData?.id?.toString().trim(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
