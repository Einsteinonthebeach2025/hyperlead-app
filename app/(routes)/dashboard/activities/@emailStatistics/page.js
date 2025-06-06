import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import EmailStats from "app/pages/dashboard/activities/emailStatistics/EmailStats";

const getUserEmailStatistics = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return null;
  }

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: emails, error: emailsError } = await supabase
    .from("emails")
    .select("opened_at, delivered, status, sent_at")
    .eq("user_id", userIdsToQuery);

  if (emailsError) {
    console.error("Error fetching emails:", emailsError);
    return null;
  }

  const openedEmails = emails.filter((email) => email.opened_at);
  const deliveredEmails = emails.filter((email) => email.delivered);
  const totalEmails = emails.length;

  return {
    totalEmails,
    openedEmails: openedEmails.length,
    deliveredEmails: deliveredEmails.length,
    openRate: totalEmails > 0 ? (openedEmails.length / totalEmails) * 100 : 0,
    deliveryRate:
      totalEmails > 0 ? (deliveredEmails.length / totalEmails) * 100 : 0,
  };
};

const EmailStatisticsPage = async () => {
  const emailStatistics = await getUserEmailStatistics();
  return <EmailStats data={emailStatistics} />;
};

export default EmailStatisticsPage;
