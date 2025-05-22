import { fetchAllLeadsFields } from "app/helpers/utils";
import { createServerClient } from "app/lib/config/supabaseServer";
import preferencesData from "app/localDB/preferencesData";
import LeadsUsage from "app/pages/adminPanel/appAnalytics/leadsUsage/LeadsUsage";

const LeadsUsagePageForAnalytics = async () => {
  const supabase = await createServerClient();

  const { count: totalLeads, error: countError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });
  if (countError) throw countError;

  const allLeads = await fetchAllLeadsFields(supabase, "country, industry");

  // Country Stats
  const countryStats = allLeads.reduce((acc, lead) => {
    const country = lead.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  const countryStatsArray = Object.entries(countryStats)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Industry Stats
  const industryCounts = preferencesData.reduce((acc, industry) => {
    acc[industry] = 0;
    return acc;
  }, {});
  allLeads.forEach((lead) => {
    const industries = Array.isArray(lead.industry)
      ? lead.industry
      : typeof lead.industry === "string"
        ? [lead.industry]
        : [];
    industries.forEach((ind) => {
      const match = preferencesData.find(
        (pref) => pref.toLowerCase() === ind.toLowerCase().trim()
      );
      if (match) {
        industryCounts[match] = (industryCounts[match] || 0) + 1;
      }
    });
  });
  const industryStats = Object.entries(industryCounts).map(
    ([industry, count]) => ({
      industry,
      count,
    })
  );

  return (
    <LeadsUsage
      totalLeads={totalLeads}
      countryStats={countryStatsArray}
      industryStats={industryStats}
    />
  );
};

export default LeadsUsagePageForAnalytics;
