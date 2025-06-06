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

const SingleLeadPage = async ({ params }) => {
  const { lead_id } = await params;
  const lead = await fetchLeadById(lead_id);

  return <SingleLead data={lead} />;
};

export default SingleLeadPage;
