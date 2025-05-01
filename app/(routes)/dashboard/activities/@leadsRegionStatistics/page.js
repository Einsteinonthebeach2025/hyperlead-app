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

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", session.user.id);

  if (userLeadsError || !userLeads) {
    return null;
  }

  // Get the leads data for these lead_ids
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

  // Process the data to get country statistics
  const countryStats = leads.reduce((acc, lead) => {
    const country = lead.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format for the component
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
