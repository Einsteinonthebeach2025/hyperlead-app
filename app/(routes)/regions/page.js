import { createServerClient } from "app/lib/config/supabaseServer";
import Regions from "app/pages/regions/Regions";

export const metadata = {
  title: "Hyperlead | Region Preferences",
  description:
    "Choose your target regions to receive tailored lead recommendations based on location preferences. Customize your lead sources in Hyperlead.",
};

const RegionsPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let regions = [];
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("region")
      .eq("id", session.user.id)
      .single();
    regions = profile?.region || [];
  }

  return <Regions initialRegions={regions} />;
};

export default RegionsPage;
