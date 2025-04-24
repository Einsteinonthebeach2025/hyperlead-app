"use client";
import { AnimatePresence } from "framer-motion";
import { setToggle } from "app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import EmailForm from "./EmailForm";
import MotionContainer from "app/components/containers/MotionContainer";
import FormContainer from "app/components/containers/FormContainer";
import FlexBox from "app/components/containers/FlexBox";
import Title from "app/components/Title";
import Close from "app/components/buttons/Close";

const EmailModal = () => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((store) => store.modal);

  const closeModal = () => {
    dispatch(setToggle(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="fade-in"
          className="fixed top-0 z-10 inset-0 bg-black/70 backdrop-blur-sm center"
        >
          <FormContainer className="w-full max-w-[600px]">
            <FlexBox type="row-between" className="w-full text-blue-600">
              <Title>Send Email</Title>
              <Close onClick={closeModal} />
            </FlexBox>
            <EmailForm data={data} closeModal={closeModal} />
          </FormContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default EmailModal;
