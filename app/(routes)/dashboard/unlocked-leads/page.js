import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import UnlockedLeads from "app/pages/dashboard/unlockedLeads/UnlockedLeads";

export const metadata = {
  title: "Hyperlead | Unlocked Leads Dashboard",
  description:
    "View all the leads you've unlocked with one-time payments. Instantly access verified contact information and lead details in your Hyperlead account.",
};

const UnlockedLeadsPage = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user)
    return (
      <UnlockedLeads data={null} message="Error occurred" desc={sessionError} />
    );

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: unlocked, error: unlockedError } = await supabase
    .from("unlocked_leads")
    .select("lead_id")
    .eq("user_id", userIdsToQuery);

  if (unlockedError) throw unlockedError;
  if (!unlocked || unlocked.length === 0)
    return (
      <UnlockedLeads
        data={null}
        title="No Unlocked Contacts Yet"
        desc="Search the full database and discover decision-makers tailored to your goals."
      />
    );

  const leadIds = unlocked.map((u) => u.lead_id);

  // 2. Fetch leads from leads table
  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .in("id", leadIds);

  if (leadsError) throw leadsError;

  return <UnlockedLeads data={leads} />;
};

export default UnlockedLeadsPage;
