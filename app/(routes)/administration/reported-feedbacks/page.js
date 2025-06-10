import { createServerClient } from "app/lib/config/supabaseServer";
import AdminFeedbacks from "app/pages/adminPanel/feedbacks/AdminFeedbacks";

export const metadata = {
  title: "Administration | Reported Feedbacks",
  description: "Reported Feedbacks",
};

const ReportedFeedbacksPage = async () => {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("feedback")
    .select(
      `
      *,
      users:user_id (
        email
      )
    `
    )
    .eq("status", "pending");
  if (error) {
    return (
      <AdminFeedbacks
        message="No feedbacks"
        desc="Await feedbacks"
        data={null}
      />
    );
  }
  return <AdminFeedbacks data={data} />;
};

export default ReportedFeedbacksPage;
