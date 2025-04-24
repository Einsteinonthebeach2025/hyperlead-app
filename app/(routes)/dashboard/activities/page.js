import { createServerClient } from "app/lib/config/supabaseServer";
import Activities from "app/pages/dashboard/activities/Activities";

export const metadata = {
  title: "Hyperlead | Dashboard",
  description: "User Dashboard",
};

const getUserStatistics = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return null;
  }
  // Fetch profile data
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "subscription, monthly_leads, leads_received_this_month, total_leads_received"
    )
    .eq("id", session.user.id)
    .single();
  if (profileError) {
    return null;
  }
  // Fetch user_leads data to analyze used/unused
  const { data: userLeads, error: leadsError } = await supabase
    .from("user_leads")
    .select("used")
    .eq("user_id", session.user.id);
  if (leadsError || !userLeads) {
    return { ...profile, used_stats: null };
  }
  // Calculate stats
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

const ActivitiesPage = async () => {
  const statisticsData = await getUserStatistics();
  return <Activities statisticsData={statisticsData} />;
};

export default ActivitiesPage;
