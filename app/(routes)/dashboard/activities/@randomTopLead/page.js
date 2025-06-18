import { createServerClient } from "app/lib/config/supabaseServer";
import { getEffectiveUserId } from "app/helpers/assistantHelper";
import RandomTopLeads from "app/pages/dashboard/activities/randomTopLead/RandomTopLeads";

const RandomTopLeadPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <RandomTopLeads data={null} />;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .in("user_id", userIdsToQuery)
    .order(`lead_id`)
    .limit(12);
  if (userLeadsError) {
    console.error("Error fetching user leads:", userLeadsError);
    return <RandomTopLeads data={[]} />;
  }
  if (!userLeads || userLeads.length === 0) {
    return <RandomTopLeads data={[]} />;
  }
  const leadIds = userLeads.map((userLead) => userLead.lead_id);
  // Then, fetch the actual lead data from leads table
  const { data: randomLeads, error: leadsError } = await supabase
    .from("leads")
    .select("id, company_title, first_name, last_name, seniority")
    .in("id", leadIds);
  if (leadsError) {
    console.error("Error fetching leads:", leadsError);
    return <RandomTopLeads data={[]} />;
  }

  return <RandomTopLeads data={randomLeads || []} />;
};

export default RandomTopLeadPage;
