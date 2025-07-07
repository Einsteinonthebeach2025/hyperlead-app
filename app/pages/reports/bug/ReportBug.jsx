"use client";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";
import SignUpAlertPage from "app/components/containers/SignUpAlertPage";
import BugForm from "./BugForm";

const ReportBug = () => {
  const user = useSelector(selectUser);

  return (
    <div className="h-screen center relative flex-col space-y-4">
      {user?.email ? (
        <FormContainer className="w-[90%] max-w-[500px] space-y-4">
          <MotionContainer animation="zoom-out">
            <Title>Report a Bug</Title>
          </MotionContainer>
          <BugForm />
        </FormContainer>
      ) : (
        <SignUpAlertPage
          title="Join us to report a bug"
          desc="You need to be signed in to report a bug and help us improve. Sign in to get started!"
        />
      )}
    </div>
  );
};

export default ReportBug;
