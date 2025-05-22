"use client"
import Button from "app/components/buttons/Button";
import { setToggle, selectLeads } from "app/features/modalSlice";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const SendNotificationButton = ({ user }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const selectedUsers = leads.filter(lead => lead.type === 'user');

  const notificationModal = () => {
    const usersToNotify = selectedUsers.length > 0 ? selectedUsers : [user];
    dispatch(setToggle({
      modalType: 'notification',
      isOpen: true,
      data: usersToNotify
    }));
  }

  return (
    <Button onClick={notificationModal} type="gold">
      <span>Send notification</span>
      <IoIosNotifications size={20} />
    </Button>
  )
}

export default SendNotificationButton