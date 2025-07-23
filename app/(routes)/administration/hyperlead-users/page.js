import { createServerClient } from "app/lib/config/supabaseServer";
import UserManagement from "app/pages/adminPanel/userManagement/UserManagement";

export const metadata = {
  title: "Hyperlead | User Management",
  description: "Hyperlead Users",
};

const HyperleadUsersPage = async () => {
  const supabase = await createServerClient();

  // Get total count of users
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Fetch first 20 users ordered by creation date
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select(
      `
      id, address, avatar_url, city, company, created_at, email, firstName, lastName,
      leads_received_this_month, linkedin_url, subscription_id, phone, position, country, reported_bugs,
      sex, subscription, subscription_timestamp, subscription_type, total_leads_received, twitter_url,
      userBirthDate, userName, web_url, address,
      transactions!user_id (
        id, paypal_order_id, plan_name, amount, status, created_at
      )
    `
    )
    .order("created_at", { ascending: true })
    .range(0, 19);
  if (usersError) {
    console.error("Error fetching users:", usersError);
    return (
      <UserManagement
        data={null}
        message="Error fetching users"
        desc="Refresh the page and try again"
      />
    );
  }

  return <UserManagement data={users} totalCount={count} />;
};

export default HyperleadUsersPage;
