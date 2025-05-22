"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectEmailModal, setToggle } from "app/features/modalSlice";
import EmailForm from "./EmailForm";
import ModalWrapper from "app/components/containers/ModalWrapper";

const EmailModal = () => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(selectEmailModal);

  const closeModal = () => {
    dispatch(setToggle({
      modalType: 'email',
      isOpen: false
    }));
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeModal}
      title="Send Email"
    >
      <EmailForm data={data} closeModal={closeModal} />
    </ModalWrapper>
  );
};

export default EmailModal;
