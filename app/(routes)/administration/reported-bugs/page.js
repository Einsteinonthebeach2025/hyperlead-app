import { createServerClient } from "app/lib/config/supabaseServer";
import ReportedBugs from "app/pages/adminPanel/bugs/ReportedBugs";

export const metadata = {
  title: "Administration | Reported Bugs",
  description: "Reported Bugs",
};

const ReportedBugsPage = async () => {
  const supabase = await createServerClient();

  const { count } = await supabase
    .from("bug_reports")
    .select("*", { count: "exact", head: true });

  // Fetch first 10 bugs
  const { data: bugs, error: bugsError } = await supabase
    .from("bug_reports")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 9);
  if (bugsError || !bugs || bugs.length === 0) {
    return (
      <ReportedBugs
        bugs={[]}
        totalCount={0}
        message="No bugs reported"
        desc="Await bugs for users to report"
      />
    );
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, userName, avatar_url");

  const bugsWithUserData = bugs.map((bug) => {
    const user = profiles.find((profile) => profile.id === bug.user_id);
    return {
      ...bug,
      userName: user?.userName,
      avatar_url: user?.avatar_url || null,
    };
  });

  return <ReportedBugs bugs={bugsWithUserData} totalCount={count} />;
};

export default ReportedBugsPage;
