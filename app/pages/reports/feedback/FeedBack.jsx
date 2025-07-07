"use client";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import FeedbackForm from "./FeedbackForm";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";
import Logo from "app/components/Logo";
import SignUpAlertPage from "app/components/containers/SignUpAlertPage";

const Feedback = () => {
  const user = useSelector(selectUser);

  return (
    <section className="h-screen relative center flex-col space-y-4">
      {user?.email ? (
        <FormContainer className="w-[90%] max-w-[500px] space-y-4">
          <MotionContainer animation="zoom-out">
            <Title>Share Your Feedback</Title>
          </MotionContainer>
          <FeedbackForm />
        </FormContainer>
      ) : (
        <SignUpAlertPage
          title="Join us to share your feedback"
          desc="You need to be signed in to share your feedback and help us improve. Sign in to get started!"
        />
      )}
    </section>
  );
};

export default Feedback;