import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import LeadsByRegions from "app/pages/dashboard/activities/leadsByRegionsStats/LeadsByRegions";

const getLeadsByRegions = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) return null;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [currentUserId];

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .in("user_id", userIdsToQuery);
  if (userLeadsError || !userLeads) return null;

  const leadIds = userLeads.map((lead) => lead.lead_id);

  const chunkArray = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );

  const chunks = chunkArray(leadIds, 100);
  let allLeads = [];

  for (const chunk of chunks) {
    const { data: leadsChunk, error } = await supabase
      .from("leads")
      .select("id, country")
      .in("id", chunk);

    if (error) {
      continue;
    }

    allLeads.push(...(leadsChunk || []));
  }

  const countryStats = allLeads.reduce((acc, lead) => {
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
