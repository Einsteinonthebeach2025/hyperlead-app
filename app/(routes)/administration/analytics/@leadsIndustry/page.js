import { createServerClient } from "app/lib/config/supabaseServer";
import IndustryStats from "app/pages/dashboard/activities/industryStatistics/IndustryStats";

const LeadsUsageIndustryPage = async () => {
  const supabase = await createServerClient();

  const { data, error } = await supabase.rpc("count_leads_by_industry");

  if (error) {
    console.error("Error fetching industry counts:", error);
    return <div>Error loading data</div>;
  }

  // Convert array of objects to expected format: { "real estate": 123, ... }
  const industryStatsObject = data.reduce(
    (acc, { industry_label, lead_count }) => {
      acc[industry_label] = lead_count;
      return acc;
    },
    {}
  );

  return <IndustryStats data={industryStatsObject} col="3" />;
};

export default LeadsUsageIndustryPage;
