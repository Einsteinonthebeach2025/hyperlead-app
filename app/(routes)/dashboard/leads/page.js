import { createServerClient } from "app/lib/config/supabaseServer";
import Leads from "app/pages/dashboard/leads/Leads";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

export const metadata = {
  title: "Hyperlead | Leads",
  description: "User prefered leads provided by Hyperlead",
};

const LeadsPage = async () => {
  const leadsPerPage = 20;
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <Leads data={null} />;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("subscription, subscription_timestamp")
    .eq("id", effectiveUserId)
    .single();
  if (profileError) {
    return <Leads data={null} message="Please subscribe to get leads" />;
  }
  // Check if user has any leads first
  const { data: allUserLeads, error: allUserLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id, used, is_demo")
    .eq("user_id", effectiveUserId);
  if (allUserLeadsError) {
    return <Leads data={null} message="Error loading leads" />;
  }
  // If user has no leads at all
  if (!allUserLeads || allUserLeads.length === 0) {
    return <Leads data={null} message="No leads available" />;
  }
  // Check if user has any non-demo leads
  const hasNonDemoLeads = allUserLeads.some((lead) => !lead.is_demo);
  // If user has non-demo leads, check subscription
  if (hasNonDemoLeads) {
    const subscriptionDate = new Date(profile.subscription_timestamp);
    const now = new Date();
    const oneMonthLater = new Date(subscriptionDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    if (now > oneMonthLater) {
      return (
        <Leads
          data={null}
          message="subscription has expired"
          desc="Please renew to view leads"
        />
      );
    }
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
      is_demo: userLead?.is_demo || false,
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
