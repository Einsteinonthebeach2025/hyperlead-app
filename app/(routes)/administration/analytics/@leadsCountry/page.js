import CardContainer from "app/components/containers/CardContainer";
import ContentHeadline from "app/components/ContentHeadline";
import { fetchAllLeadsFields } from "app/helpers/utils";
import { createServerClient } from "app/lib/config/supabaseServer";
import CountryStats from "app/pages/dashboard/activities/leadsByRegionsStats/components/CountryStats";

const LeadsUsageCountryPage = async () => {
  const supabase = await createServerClient();

  const { count: totalLeads, error: countError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });
  if (countError) throw countError;

  const allLeads = await fetchAllLeadsFields(supabase, "country");

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

  return (
    <CardContainer>
      <ContentHeadline
        className="border-bottom mb-2"
        type="column-start"
        title="Most Leads"
        desc="Hyperleads by country"
      />
      <CountryStats
        data={countryStatsArray}
        total={totalLeads}
        color="bg-amber-500"
      />
    </CardContainer>
  );
};

export default LeadsUsageCountryPage;
