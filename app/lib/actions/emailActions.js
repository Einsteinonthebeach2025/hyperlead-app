"use server";
import { Resend } from "resend";
import { createServerClient } from "../config/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ user_id, email, lead_id, subject, message }) {
  try {
    const { data: emailData } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "graphchiqovani@yahoo.com",
      subject,
      html: message,
    });
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("emails")
      .insert({
        user_id,
        email,
        lead_id,
        leads_email: "graphchiqovani@yahoo.com",
        subject,
        message,
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    console.log("Successfully inserted email record:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in sendEmail:", error);
    return { success: false, error: error.message };
  }
}
