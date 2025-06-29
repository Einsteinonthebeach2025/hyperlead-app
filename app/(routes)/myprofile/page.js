import { createServerClient } from "app/lib/config/supabaseServer";
import MyProfile from "app/pages/myprofile/MyProfile";

export const metadata = {
  title: "Hyperlead | Your Profile - Manage Personal Data",
  description:
    "Access and update your personal information, preferences, and account settings securely through your Hyperlead profile page. Take full control of your data in one place.",
};

const MyProfilePage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return <MyProfile data={null} />;
  }
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    return <MyProfile data={null} />;
  }

  return <MyProfile data={profileData} />;
};

export default MyProfilePage;
