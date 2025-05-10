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
    const htmlContent = generateEmailHTML(subject, message, email);
    const { data: emailData } = await resend.emails.send({
      from: "Hyperlead <contact@hyperlead.net>",
      replyTo: email,
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
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteEmail(emailId) {
  if (!emailId) {
    return { success: false, error: "No email ID provided" };
  }
  try {
    const supabase = await createServerClient();
    const { data: existingEmail, error: fetchError } = await supabase
      .from("emails")
      .select("id")
      .eq("id", emailId)
      .single();
    if (fetchError) {
      console.error("Error fetching email:", fetchError);
      return { success: false, error: "Email not found" };
    }
    if (!existingEmail) {
      console.error("Email not found with ID:", emailId);
      return { success: false, error: "Email not found" };
    }
    // Proceed with deletion
    const { error: deleteError } = await supabase
      .from("emails")
      .delete()
      .eq("id", emailId);
    if (deleteError) {
      throw deleteError;
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
