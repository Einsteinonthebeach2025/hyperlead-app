import { createServerClient } from "app/lib/config/supabaseServer";
import UserActivity from "app/pages/adminPanel/appAnalytics/userActivity/UserActivity";

const getUsers = async () => {
  const supabase = await createServerClient();

  const { count: totalLeads, error: countError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });
  if (countError) throw countError;

  // Fetch all users' created_at
  const { data, error } = await supabase
    .from("profiles")
    .select("id, created_at");

  if (error) throw error;

  // Group by month
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    users: 0,
  }));

  data.forEach((profile) => {
    const date = new Date(profile.created_at);
    const monthIdx = date.getMonth();
    months[monthIdx].users += 1;
  });

  const totalUsers = data.length;

  // --- Weekly users logic ---
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
  const mondayThisWeek = new Date(now);
  mondayThisWeek.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  mondayThisWeek.setHours(0, 0, 0, 0);

  const mondayLastWeek = new Date(mondayThisWeek);
  mondayLastWeek.setDate(mondayThisWeek.getDate() - 7);

  const sundayLastWeek = new Date(mondayThisWeek);
  sundayLastWeek.setDate(mondayThisWeek.getDate() - 1);
  sundayLastWeek.setHours(23, 59, 59, 999);

  let currentWeek = 0;
  let lastWeek = 0;

  data.forEach((profile) => {
    const created = new Date(profile.created_at);
    if (created >= mondayThisWeek && created <= now) {
      currentWeek += 1;
    } else if (created >= mondayLastWeek && created <= sundayLastWeek) {
      lastWeek += 1;
    }
  });

  const weeklyUsers = { current: currentWeek, last: lastWeek };
  return { totalUsers, totalLeads, monthlyUsers: months, weeklyUsers };
};

const UserActivityPage = async () => {
  const { totalUsers, monthlyUsers, weeklyUsers, totalLeads } =
    await getUsers();
  return (
    <UserActivity
      monthlyUsers={monthlyUsers}
      totalUsers={totalUsers}
      weeklyUsers={weeklyUsers}
      totalLeads={totalLeads}
    />
  );
};

export default UserActivityPage;
