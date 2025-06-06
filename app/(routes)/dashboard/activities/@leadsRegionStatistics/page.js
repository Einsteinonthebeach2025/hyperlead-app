import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import LeadsByRegions from "app/pages/dashboard/activities/leadsByRegionsStats/LeadsByRegions";

const getLeadsByRegions = async () => {
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

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", userIdsToQuery);
  if (userLeadsError || !userLeads) {
    return null;
  }

  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("id, country")
    .in(
      "id",
      userLeads.map((lead) => lead.lead_id)
    );
  if (leadsError || !leads) {
    return null;
  }

  const countryStats = leads.reduce((acc, lead) => {
    const country = lead.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const stats = Object.entries(countryStats).map(([country, count]) => ({
    country,
    count,
  }));

  return stats;
};

const LeadsRegionStatisticsPage = async () => {
  const data = await getLeadsByRegions();
  return <LeadsByRegions data={data} />;
};

export default LeadsRegionStatisticsPage;
