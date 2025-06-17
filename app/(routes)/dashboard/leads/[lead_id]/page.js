import { createServerClient } from "app/lib/config/supabaseServer";
import SingleLead from "app/pages/dashboard/leads/singleLead/SingleLead";

export const generateMetadata = async ({ params }) => {
  const { lead_id } = await params;
  const lead = await fetchLeadById(lead_id);
  return {
    title: `${lead.company_title}`,
  };
};

const fetchLeadById = async (leadId) => {
  const supabase = await createServerClient();
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .single();

  if (error) {
    console.error("Error fetching lead:", error);
    return null;
  }

  return lead;
};

const SingleLeadPage = async ({ params, searchParams }) => {
  const { lead_id } = await params;
  const lead = await fetchLeadById(lead_id);
  // Check for ?history=1 in the query string
  const table =
    searchParams?.history === "1" ? "user_leads_history" : "user_leads";
  return <SingleLead data={lead} table={table} />;
};

export default SingleLeadPage;
