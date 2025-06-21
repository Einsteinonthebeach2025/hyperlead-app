import { createServerClient } from "app/lib/config/supabaseServer";
import HistoryLeads from "app/pages/dashboard/historyLeads/HistoryLeads";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

export const metadata = {
  title: "Hyperlead | History Leads",
  description: "History Leads",
};

const HistoryLeadsPage = async () => {
  const leadsPerPage = 20;
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <HistoryLeads data={null} />;
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
    return <HistoryLeads data={null} message="Please subscribe to get leads" />;
  }
  // Check if user has any history leads first
  const { data: allUserHistoryLeads, error: allUserHistoryLeadsError } =
    await supabase
      .from("user_leads_history")
      .select("lead_id, used, is_demo")
      .eq("user_id", effectiveUserId);
  if (allUserHistoryLeadsError) {
    return <HistoryLeads data={null} message="Error loading history leads" />;
  }
  if (allUserHistoryLeads && allUserHistoryLeads.length > 0) {
    const allDemoLeads = allUserHistoryLeads.every((lead) => lead.is_demo);
    if (allDemoLeads) {
      return (
        <HistoryLeads
          data={null}
          message="No History Leads"
          desc="After getting new leads, existing leads will be available here"
        />
      );
    }
  }
  const hasNonDemoHistoryLeads = allUserHistoryLeads.some(
    (lead) => !lead.is_demo
  );
  if (hasNonDemoHistoryLeads && !profile.subscription) {
    return (
      <HistoryLeads
        data={null}
        message="subscription has expired"
        desc="Please renew to view history leads"
      />
    );
  }
  const historyLeadIds = allUserHistoryLeads.map((ul) => ul.lead_id);
  const { data: allHistoryLeadsData, error: allHistoryLeadsError } =
    await supabase.from("leads").select("*").in("id", historyLeadIds);
  if (allHistoryLeadsError) {
    return <HistoryLeads data={null} message="Error loading history leads" />;
  }
  // Merge used status with history leads data
  const historyLeadsWithUsedStatus = allHistoryLeadsData.map((lead) => {
    const userHistoryLead = allUserHistoryLeads.find(
      (ul) => ul.lead_id === lead.id
    );
    return {
      ...lead,
      used: userHistoryLead?.used || false,
    };
  });
  const paginatedHistoryLeads = historyLeadsWithUsedStatus.slice(
    0,
    leadsPerPage
  );
  const totalPages = Math.ceil(
    historyLeadsWithUsedStatus.length / leadsPerPage
  );

  return (
    <HistoryLeads
      data={paginatedHistoryLeads}
      currentPage={1}
      totalPages={totalPages}
      allLeads={historyLeadsWithUsedStatus}
    />
  );
};

export default HistoryLeadsPage;
