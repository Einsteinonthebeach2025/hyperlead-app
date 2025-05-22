"use client"
import { useDispatch, useSelector } from "react-redux"
import { selectNotificationModal, setToggle } from "app/features/modalSlice"
import NotificationForm from "./NotificationForm"
import ModalWrapper from "app/components/containers/ModalWrapper"

const SendNotificationModal = () => {
  const dispatch = useDispatch();
  const notificationModal = useSelector(selectNotificationModal)

  const closeModal = () => {
    dispatch(setToggle({
      modalType: 'notification',
      isOpen: false
    }));
  }

  return (
    <ModalWrapper
      isOpen={notificationModal.isOpen}
      onClose={closeModal}
      title="Send Notification"
    >
      <NotificationForm data={notificationModal.data} closeModal={closeModal} />
    </ModalWrapper>
  )
}

export default SendNotificationModal