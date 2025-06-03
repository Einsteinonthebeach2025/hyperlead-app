import { createServerClient } from "app/lib/config/supabaseServer";
import FavoriteLeads from "app/pages/dashboard/favoriteLeads/FavoriteLeads";

export const metadata = {
  title: "Hyperlead | Favorite Leads",
  description: "Favorite Leads",
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

  // First get the user's profile with favorite_leads
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("favorite_leads")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile?.favorite_leads?.length) {
    return (
      <FavoriteLeads
        data={[]}
        title="second error"
        desc="You can add leads to your favorite leads by clicking the heart icon on the lead card"
      />
    );
  }

  // Then fetch the leads that match the favorite_leads array
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
