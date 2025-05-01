import { createServerClient } from "app/lib/config/supabaseServer";
import UsedLeadsInsight from "app/pages/dashboard/activities/usedLeadsStatistics/UsedLeadsInsight";

const getUserStatistics = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return null;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", session.user.id)
    .single();
  if (profileError) {
    return null;
  }
  const { data: userLeads, error: leadsError } = await supabase
    .from("user_leads")
    .select("used")
    .eq("user_id", session.user.id);
  if (leadsError || !userLeads) {
    return { ...profile, used_stats: null };
  }
  const usedCount = userLeads.filter((lead) => lead.used).length;
  const unusedCount = userLeads.length - usedCount;

  return {
    ...profile,
    used_stats: {
      used: usedCount,
      unused: unusedCount,
    },
  };
};

const UsedLeadsStatisticsPage = async () => {
  const usedLeadsData = await getUserStatistics();
  return <UsedLeadsInsight data={usedLeadsData} />;
};

export default UsedLeadsStatisticsPage;
