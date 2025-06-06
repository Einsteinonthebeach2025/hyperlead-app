import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import UsedLeadsInsight from "app/pages/dashboard/activities/usedLeadsStatistics/UsedLeadsInsight";

const getUsedStatistics = async () => {
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
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userIdsToQuery)
    .single();
  if (profileError) {
    return null;
  }
  const { data: userLeads, error: leadsError } = await supabase
    .from("user_leads")
    .select("used")
    .eq("user_id", userIdsToQuery);
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
  const usedLeadsData = await getUsedStatistics();
  return <UsedLeadsInsight data={usedLeadsData} />;
};

export default UsedLeadsStatisticsPage;
