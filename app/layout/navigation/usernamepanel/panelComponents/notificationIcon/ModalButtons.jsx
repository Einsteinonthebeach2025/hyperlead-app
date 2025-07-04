import Button from "app/components/buttons/Button";
import FlexBox from "app/components/containers/FlexBox";
import supabase from "app/lib/config/supabaseClient";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";

const ModalButtons = ({ refresh }) => {
  const user = useSelector(selectUser);

  const handleReadAll = async (e) => {
    e.stopPropagation();
    if (!user?.id) return;
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    if (error) {
      console.error("Error marking notifications as read:", error);
      return;
    }
    refresh();
  };

  return (
    <FlexBox type="row-between">
      <Button href="/dashboard/notifications" className="w-fit">
        View all notifications
      </Button>
      <Button onClick={handleReadAll}>
        Read all
      </Button>
    </FlexBox>
  );
};

export default ModalButtons;
