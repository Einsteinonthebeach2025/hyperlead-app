"use client";
import GradientContainer from "app/components/containers/GradientContainer";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";
import { selectUser } from "app/features/userSlice";
import Logo from "app/components/Logo";
import SectionHeadline from "app/components/SectionHeadline";
import FlexBox from "app/components/containers/FlexBox";
import Button from "app/components/buttons/Button";

const Feedback = () => {
  const user = useSelector(selectUser);

  return (
    <section className="h-screen relative center">
      <GradientContainer />
      {user?.email ? (
        <FormContainer className="w-[90%] max-w-[500px] space-y-4">
          <MotionContainer animation="zoom-out">
            <Title>Share Your Feedback</Title>
          </MotionContainer>
          <FeedbackForm />
        </FormContainer>
      ) : (
        <FlexBox type="center-col" className="space-y-6">
          <Logo />
          <SectionHeadline
            title="Join us to share your feedback"
            desc="You need to be signed in to share your feedback and help us improve. Sign in to get started!"
          />
          <FlexBox type="row" className="space-x-4">
            <Button href="/signin" type="blue">
              Sign In
            </Button>
            <Button href="/signup">Sign Up</Button>
          </FlexBox>
        </FlexBox>
      )}
    </section>
  );
};

export default Feedback;
