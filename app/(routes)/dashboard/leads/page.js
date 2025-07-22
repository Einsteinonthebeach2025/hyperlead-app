import { createServerClient } from "app/lib/config/supabaseServer";
import Leads from "app/pages/dashboard/leads/Leads";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

export const metadata = {
  title: "Hyperlead | Your Leads Dashboard",
  description:
    "Access and manage your current leads easily in one place. View lead details, track progress, and take action directly from your Hyperlead dashboard.",
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
  const { effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "subscription, subscription_timestamp, id, email, unlocked_leads_count"
    )
    .eq("id", effectiveUserId)
    .single();
  if (profileError) {
    return <Leads data={null} message="Please subscribe to get leads" />;
  }
  // Check if user has any leads first
  const { data: allUserLeads, error: allUserLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id, used, is_demo, is_extra")
    .eq("user_id", effectiveUserId);
  if (allUserLeadsError) {
    return (
      <Leads
        data={null}
        message="Error loading leads"
        desc="Please try again later"
      />
    );
  }
  const hasNonDemoLeads = allUserLeads.some(
    (lead) => !lead.is_demo && !lead.is_extra
  );
  const hasDemoLeads = allUserLeads.some((lead) => lead.is_demo);
  const hasExtraLeads = allUserLeads.some((lead) => lead.is_extra);

  if (
    hasNonDemoLeads &&
    !hasDemoLeads &&
    !hasExtraLeads &&
    !profile.subscription
  ) {
    return (
      <Leads
        data={null}
        message="Subscription has expired"
        desc="Please renew to view leads"
      />
    );
  }

  // If user has no leads at all
  if (!allUserLeads || allUserLeads.length === 0) {
    return <Leads data={null} message="No leads available" />;
  }

  // const { data: historyLeads } = await supabase
  //   .from("user_leads_history")
  //   .select("lead_id")
  //   .eq("user_id", effectiveUserId);

  // const historyLeadIds = historyLeads.map((ul) => ul.lead_id);
  const currentLeadIds = allUserLeads.map((ul) => ul.lead_id);

  // Helper to chunk an array
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const chunkedIds = chunkArray(currentLeadIds, 100);
  let allLeadsData = [];
  let allLeadsError = null;

  for (const chunk of chunkedIds) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .in("id", chunk);
    if (error) {
      allLeadsError = error;
      break;
    }
    allLeadsData = allLeadsData.concat(data);
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
      profile={profile}
      data={paginatedLeads}
      currentPage={1}
      totalPages={totalPages}
      allLeads={leadsWithUsedStatus}
    />
  );
};

export default LeadsPage;
