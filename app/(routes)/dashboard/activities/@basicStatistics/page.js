import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import BasicStats from "app/pages/dashboard/activities/basicStatistics/BasicStats";

const getBasicStats = async () => {
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
    .select(
      "subscription, monthly_leads, leads_received_this_month, total_leads_received, subscription_timestamp"
    )
    .eq("id", userIdsToQuery)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return null;
  }

  return profile;
};

const BasicStatisticsPage = async () => {
  const data = await getBasicStats();
  return <BasicStats data={data} />;
};

export default BasicStatisticsPage;
