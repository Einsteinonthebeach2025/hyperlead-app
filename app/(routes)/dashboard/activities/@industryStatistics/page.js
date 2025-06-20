import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import IndustryStats from "app/pages/dashboard/activities/industryStatistics/IndustryStats";

const IndustryStatisticsPage = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) return <IndustryStats data={null} />;

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );
  const userIdsToQuery = isAssistant ? [effectiveUserId] : [session.user.id];

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("preferences")
    .eq("id", userIdsToQuery)
    .single();
  if (profileError || !profile) {
    return <IndustryStats data={null} />;
  }

  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", userIdsToQuery);
  if (userLeadsError || !userLeads) {
    return <IndustryStats data={null} />;
  }
  const allLeadIds = userLeads.map((ul) => ul.lead_id);
  const { data: allLeads, error: allLeadsError } = await supabase
    .from("leads")
    .select("industry")
    .in("id", allLeadIds);
  if (allLeadsError || !allLeads) {
    return <IndustryStats data={null} />;
  }

  const userPreferences = profile.preferences;
  const preferenceLeadCounts = userPreferences.reduce((acc, preference) => {
    acc[preference] = 0;
    return acc;
  }, {});

  allLeads.forEach((lead) => {
    lead.industry.forEach((industryItem) => {
      if (userPreferences.includes(industryItem)) {
        preferenceLeadCounts[industryItem]++;
      }
    });
  });
  return <IndustryStats data={preferenceLeadCounts} />;
};

export default IndustryStatisticsPage;
