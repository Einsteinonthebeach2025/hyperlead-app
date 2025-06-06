import { createServerClient } from "app/lib/config/supabaseServer";
import EmailSequences from "app/pages/dashboard/emailSequence/EmailSequences";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

const EmailSequencePage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <EmailSequences />;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );

  const { data: emailSequences, error: emailSequencesError } = await supabase
    .from("emails")
    .select("*")
    .eq("user_id", effectiveUserId)
    .eq("type", "sequenced_email")
    .order("sequence_id", { ascending: true });

  const leadIds = emailSequences.map((email) => email.lead_id);

  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("id, company_title, first_name, last_name, seniority")
    .in("id", leadIds);

  // Create a map of leads for easy lookup
  const leadsMap =
    leads?.reduce((acc, lead) => {
      acc[lead.id] = lead;
      return acc;
    }, {}) || {};

  const groupedSequences = emailSequences?.reduce((acc, email) => {
    if (!acc[email.sequence_id]) {
      acc[email.sequence_id] = [];
    }
    acc[email.sequence_id].push(email);
    return acc;
  }, {});

  const transformedSequences = Object.values(groupedSequences || {})
    .map((emails) => {
      if (!emails.length) return null;
      const {
        id,
        sequence_id,
        user_id,
        type,
        message,
        subject,
        sequence_name,
        email,
      } = emails[0];

      const recipients = emails.map((e) => {
        const lead = leadsMap[e.lead_id] || {};
        return {
          leads_email: e.leads_email,
          lead_id: e.lead_id,
          opened_at: e.opened_at,
          resend_message_id: e.resend_message_id,
          delivered: e.delivered,
          id: e.id,
          sent_at: e.sent_at,
          status: e.status,
          company_title: lead.company_title || null,
          first_name: lead.first_name || null,
          last_name: lead.last_name || null,
          seniority: lead.seniority || null,
        };
      });

      return {
        id,
        sequence_id,
        user_id,
        type,
        message,
        subject,
        sequence_name,
        email,
        recipients,
      };
    })
    .filter(Boolean);

  return <EmailSequences data={transformedSequences} />;
};

export default EmailSequencePage;
