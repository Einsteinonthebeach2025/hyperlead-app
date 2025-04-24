import { createServerClient } from "app/lib/config/supabaseServer";
import Leads from "app/pages/dashboard/leads/Leads";

export const metadata = {
  title: "Hyperlead | Leads",
  description: "User prefered leads provided by Hyperlead",
};

const LeadsPage = async () => {
  const leadsPerPage = 10;
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <Leads data={null} />;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("subscription, subscription_timestamp")
    .eq("id", session.user.id)
    .single();

  if (
    profileError ||
    !profile?.subscription ||
    !profile?.subscription_timestamp
  ) {
    return <Leads data={null} message="Please subscribe to get leads" />;
  }

  const subscriptionDate = new Date(profile.subscription_timestamp);
  const now = new Date();
  const oneMonthLater = new Date(subscriptionDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  if (now > oneMonthLater) {
    return (
      <Leads
        data={null}
        message="Your subscription has expired. Please renew to view leads"
      />
    );
  }
  const { data: allUserLeads, error: allUserLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id, used")
    .eq("user_id", session.user.id);

  if (allUserLeadsError) {
    return <Leads data={null} message="Error loading leads" />;
  }
  const allLeadIds = allUserLeads.map((ul) => ul.lead_id);
  const { data: allLeadsData, error: allLeadsError } = await supabase
    .from("leads")
    .select("*")
    .in("id", allLeadIds);
  if (allLeadsError) {
    return <Leads data={null} message="Error loading leads" />;
  }
  // Merge used status with leads data
  const leadsWithUsedStatus = allLeadsData.map((lead) => {
    const userLead = allUserLeads.find((ul) => ul.lead_id === lead.id);
    return {
      ...lead,
      used: userLead?.used || false,
    };
  });
  const paginatedLeads = leadsWithUsedStatus.slice(0, leadsPerPage);
  const totalPages = Math.ceil(leadsWithUsedStatus.length / leadsPerPage);

  return (
    <Leads
      data={paginatedLeads}
      currentPage={1}
      totalPages={totalPages}
      allLeads={leadsWithUsedStatus}
    />
  );
};

export default LeadsPage;
