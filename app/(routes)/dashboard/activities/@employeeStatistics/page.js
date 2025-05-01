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

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", session.user.id);
  if (userLeadsError || !userLeads) {
    return null;
  }

  const leadIds = userLeads.map((lead) => lead.lead_id);

  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("id, employees, company_title")
    .in("id", leadIds)
    .limit(5);

  if (leadsError || !leads) {
    return null;
  }

  const formattedLeads = leads.map((lead) => ({
    id: lead.id,
    company_title: lead.company_title,
    employees: lead.employees,
    annual_revenue: lead.annual_revenue,
  }));

  return formattedLeads;
};

const EmployeeStatisticsPage = async () => {
  const data = await getEmployeeStatistics();

  return <EmployeeStats data={data} />;
};

export default EmployeeStatisticsPage;
