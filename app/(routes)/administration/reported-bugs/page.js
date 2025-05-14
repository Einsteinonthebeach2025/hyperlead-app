import { createServerClient } from "app/lib/config/supabaseServer";
import ReportedBugs from "app/pages/adminPanel/bugs/ReportedBugs";

export const metadata = {
  title: "Administration | Reported Bugs",
  description: "Reported Bugs",
};

const ReportedBugsPage = async () => {
  const supabase = await createServerClient();
  const { data: bugs, error: bugsError } = await supabase
    .from("bug_reports")
    .select("*");

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, userName, avatar_url");

  if (bugsError || profilesError) {
    return (
      <ReportedBugs
        bugs={null}
        message="No bugs"
        desc="Await bugs for users to report"
      />
    );
  }

  const bugsWithUserData = bugs.map((bug) => {
    const user = profiles.find((profile) => profile.id === bug.user_id);
    return {
      ...bug,
      userName: user?.userName,
      avatar_url: user?.avatar_url || null,
    };
  });

  return <ReportedBugs bugs={bugsWithUserData} />;
};

export default ReportedBugsPage;
