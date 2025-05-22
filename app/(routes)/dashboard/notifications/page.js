import { createServerClient } from "app/lib/config/supabaseServer";
import Notifications from "app/pages/dashboard/notifications/Notifications";

export const metadata = {
  title: "Hyperlead | Notifications",
  description: "Notifications page ",
};

const NotificationsPage = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user)
    return (
      <Notifications data={null} message="Error occured" desc={sessionError} />
    );

  const { data: notifications, error: notificationsError } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", session.user.id);

  if (notificationsError)
    return (
      <Notifications
        data={null}
        message="Error occured"
        desc={notificationsError}
      />
    );

  return <Notifications data={notifications} />;
};

export default NotificationsPage;
