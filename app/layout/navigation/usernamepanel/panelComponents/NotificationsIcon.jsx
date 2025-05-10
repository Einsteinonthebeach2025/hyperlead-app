import { useToggleLocal } from "app/hooks/useToggleLocal";
import NotificationModal from "app/pages/notifications/NotificationModal";
import { IoMdNotifications } from "react-icons/io";

const NotificationsIcon = () => {
  const { isOpen, toggleState } = useToggleLocal(false);

  return (
    <div
      onClick={() => toggleState(!isOpen)}
      className="border relative p-2 mr-2 rounded-full border-neutral-300 text-neutral-600 hover:text-neutral-900 duration-300"
    >
      <IoMdNotifications size={23} />
      <NotificationModal isOpen={isOpen} />
    </div>
  );
};

export default NotificationsIcon;
