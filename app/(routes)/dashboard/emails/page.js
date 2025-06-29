import { createServerClient } from "app/lib/config/supabaseServer";
import { getEffectiveUserId } from "app/helpers/assistantHelper";
import Emails from "app/pages/dashboard/emails/Emails";

export const metadata = {
  title: "Hyperlead | Sent Emails & Tracking",
  description:
    "View your sent emails to leads, track delivery status, opens, and monitor all your email communications within Hyperlead.",
};

const DashboardEmailsPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <Emails data={null} />;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: emails, error: emailsError } = await supabase
    .from("emails")
    .select(
      "id, message, subject, sent_at, delivered, opened_at, lead_id, leads_email, follow_up_email"
    )
    .in("user_id", userIdsToQuery)
    .eq("type", "single_email")
    .order("sent_at", { ascending: false });
  if (emailsError) {
    return <Emails data={null} />;
  }

  const leadIDs = emails.map((email) => email.lead_id);
  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select(
      "id, company_linkedin_url, first_name, last_name, company_title, seniority, website"
    )
    .in("id", leadIDs);
  if (leadsError) {
    return <Emails data={null} />;
  }
  const emailsWithLeads = emails.map((email) => {
    const leadData = leads.find((lead) => lead.id === email.lead_id);
    return {
      ...email,
      leads: leadData || null,
    };
  });

  return <Emails data={emailsWithLeads} />;
};

export default DashboardEmailsPage;
