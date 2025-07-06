import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import EmployeeStats from "app/pages/dashboard/activities/employeeStatistics/EmployeeStats";

const getEmployeeStatistics = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return null;
  }

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [currentUserId];

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .in("user_id", userIdsToQuery);
  if (userLeadsError || !userLeads) {
    return null;
  }
  const leadIds = userLeads.map((lead) => lead.lead_id);

  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const chunks = chunkArray(leadIds, 100);
  let allLeads = [];

  for (const chunk of chunks) {
    const { data: leadsChunk, error } = await supabase
      .from("leads")
      .select("id, employees, company_title, annual_revenue")
      .in("id", chunk);

    if (error) {
      continue;
    }

    allLeads.push(...(leadsChunk || []));
  }

  const topLeads = allLeads
    .sort((a, b) => (b.employees || 0) - (a.employees || 0))
    .slice(0, 5);

  return topLeads;
};

const EmployeeStatisticsPage = async () => {
  const data = await getEmployeeStatistics();

  return <EmployeeStats data={data} />;
};

export default EmployeeStatisticsPage;
