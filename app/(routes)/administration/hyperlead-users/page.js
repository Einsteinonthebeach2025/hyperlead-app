import supabase from "app/lib/config/supabaseClient";
import UserManagement from "app/pages/adminPanel/userManagement/UserManagement";

export const metadata = {
  title: "Hyperlead | User Management",
  description: "Hyperlead Users",
};

const HyperleadUsersPage = async () => {
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*");

  if (usersError) {
    <UserManagement
      data={null}
      message="Error fetching users"
      desc="Refresh the page and try again"
    />;
  }

  return <UserManagement data={users} />;
};

export default HyperleadUsersPage;
