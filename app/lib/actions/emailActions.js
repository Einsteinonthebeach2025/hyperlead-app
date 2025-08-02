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
  type = "single_email",
  sequence_name = null,
  sequence_id = null,
  follow_up = false,
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
        type,
        sequence_name,
        sequence_id,
        follow_up,
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

export async function sendEmailToUsers({
  user_id,
  email,
  recipient_id,
  recipient_email,
  subject,
  message,
}) {
  try {
    const htmlContent = generateEmailHTML(subject, message, email);
    const { data: emailData } = await resend.emails.send({
      from: "Hyperlead <contact@hyperlead.net>",
      replyTo: email,
      to: recipient_email,
      subject,
      html: htmlContent,
    });
    console.log("[sendEmailToUsers] Resend response:", emailData);
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("emails")
      .insert({
        user_id,
        email,
        lead_id: [recipient_id],
        leads_email: [recipient_email],
        subject,
        message,
        status: "sent",
        sent_at: new Date().toISOString(),
        resend_message_id: [emailData?.id],
        type: "email_sequence",
        sequence_name: null,
        recipient_emails: [],
        opened_at: Array(recipient_emails.length).fill(null),
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

export async function deleteEmailSequence(sequenceId) {
  if (!sequenceId) {
    return { success: false, error: "No sequence ID provided" };
  }
  try {
    const supabase = await createServerClient();
    const { error: deleteError } = await supabase
      .from("emails")
      .delete()
      .eq("sequence_id", sequenceId);
    if (deleteError) {
      throw deleteError;
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function sendSubscriptionCancelEmail({
  userName,
  email,
  cancelled_at,
  subscriptionId,
}) {
  try {
    const subject = "Your HyperLead Subscription Has Been Cancelled";
    const message = `
      Dear ${userName || "Customer"},
      <br/><br/>
      This is to confirm that your subscription ${subscriptionId ? `with ID <b>${subscriptionId}</b>` : ""} has been successfully cancelled as of <b>${new Date(cancelled_at).toLocaleString()}</b>.<br/>
      During your inactive period, you will no longer have access to leads or premium features. If you wish to reactivate your subscription in the future, you can do so anytime from your account dashboard.<br/><br/>
      Thank you for being a valued member of HyperLead. If you have any questions or need assistance, please contact our support team.<br/><br/>
      Best regards,<br/>
      The HyperLead Team
    `;
    const htmlContent = message;
    const { data: emailData } = await resend.emails.send({
      from: "HyperLead <contact@hyperlead.net>",
      to: email,
      subject,
      html: htmlContent,
    });
    // Optionally, log or store the email event
    return { success: true, data: emailData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getMonthlyCampaignCount(userId) {
  const supabase = await createServerClient();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("emails")
    .select("sequence_id")
    .eq("user_id", userId)
    .eq("type", "sequenced_email")
    .gte("sent_at", monthStart.toISOString());
  if (error) {
    return { success: false, error: error.message };
  }

  // Count unique sequence_id (each campaign should have a unique sequence_id)
  const uniqueCampaigns = new Set(data.map((e) => e.sequence_id));
  return { success: true, count: uniqueCampaigns.size };
}

export async function incrementEmailCampaignCount(userId) {
  const supabase = await createServerClient();
  // Get current count
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("email_campaign_count")
    .eq("id", userId)
    .single();
  if (fetchError) return { success: false, error: fetchError.message };

  const currentCount = profile?.email_campaign_count || 0;
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ email_campaign_count: currentCount + 1 })
    .eq("id", userId);
  if (updateError) return { success: false, error: updateError.message };

  return { success: true };
}
