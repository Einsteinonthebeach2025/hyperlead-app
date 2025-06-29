import { createServerClient } from "app/lib/config/supabaseServer";
import FavoriteLeads from "app/pages/dashboard/favoriteLeads/FavoriteLeads";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

export const metadata = {
  title: "Hyperlead | Favorite Leads Dashboard",
  description:
    "Quickly access and manage your favorite leads. Keep track of top prospects and easily revisit important contacts in your Hyperlead account.",
};

const FavoriteLeadsPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session || sessionError) {
    return (
      <FavoriteLeads
        data={[]}
        title="first error"
        desc="You can add leads to your favorite leads by clicking the heart icon on the lead card"
      />
    );
  }
  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("favorite_leads")
    .eq("id", effectiveUserId)
    .single();

  if (profileError || !profile?.favorite_leads?.length) {
    return (
      <FavoriteLeads
        data={[]}
        title="No favorite leads found"
        desc="You can add leads to your favorite leads by clicking the heart icon on the lead card"
      />
    );
  }

  // Fetch the leads that match the favorite_leads array
  const { data: favoriteLeads, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .in("id", profile.favorite_leads);

  if (leadsError) {
    console.error("Error fetching favorite leads:", leadsError);
    return (
      <FavoriteLeads
        data={[]}
        title="third error"
        desc="There was an error loading your favorite leads. Please try again later."
      />
    );
  }

  return <FavoriteLeads data={favoriteLeads || []} />;
};

export default FavoriteLeadsPage;
