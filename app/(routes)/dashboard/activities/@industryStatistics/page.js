import { getEffectiveUserId } from "app/helpers/assistantHelper";
import { createServerClient } from "app/lib/config/supabaseServer";
import IndustryStats from "app/pages/dashboard/activities/industryStatistics/IndustryStats";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const CHUNK_SIZE = 100; // Safe chunk size for Supabase

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
  const leadIdChunks = chunkArray(allLeadIds, CHUNK_SIZE);

  let allLeads = [];
  for (const chunk of leadIdChunks) {
    const { data: leadsChunk, error: leadsChunkError } = await supabase
      .from("leads")
      .select("industry")
      .in("id", chunk);

    if (leadsChunkError) {
      return <IndustryStats data={null} />;
    }
    allLeads = allLeads.concat(leadsChunk);
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
