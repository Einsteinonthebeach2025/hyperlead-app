import { createServerClient } from "app/lib/config/supabaseServer";
import Notifications from "app/pages/dashboard/notifications/Notifications";

export const metadata = {
  title: "Hyperlead | Notifications Center",
  description:
    "View and manage your notifications, alerts, and important updates related to your leads, account activity, and system messages on Hyperlead.",
};

const NotificationsPage = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user)
    return (
      <Notifications data={null} message="Error occurred" desc={sessionError} />
    );

  const { data: notifications, error: notificationsError } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", session.user.id);

  if (notificationsError)
    return (
      <Notifications
        data={null}
        message="Error occurred"
        desc={notificationsError}
      />
    );

  return <Notifications data={notifications} />;
};

export default NotificationsPage;
