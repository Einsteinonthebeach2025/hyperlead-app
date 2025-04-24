import { createServerClient } from "app/lib/config/supabaseServer";
import PreferencesForm from "app/pages/preferences/PreferencesForm";

export const metadata = {
  title: "Hyperlead | Preferences",
  description:
    "Customize your preferences by selecting your professional interests and areas of expertise",
};

const PreferencesPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let preferences = [];
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("preferences")
      .eq("id", session.user.id)
      .single();
    preferences = profile?.preferences || [];
  }

  return <PreferencesForm initialPreferences={preferences} />;
};

export default PreferencesPage;
