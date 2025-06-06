import { createServerClient } from "app/lib/config/supabaseServer";
import Notifications from "app/pages/dashboard/notifications/Notifications";
import { getEffectiveUserId } from "app/helpers/assistantHelper";

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
      <Notifications data={null} message="Error occurred" desc={sessionError} />
    );

  const currentUserId = session.user.id;
  const currentUserEmail = session.user.email;
  const { isAssistant, effectiveUserId } = await getEffectiveUserId(
    currentUserId,
    currentUserEmail
  );

  const { data: notifications, error: notificationsError } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", effectiveUserId);

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
