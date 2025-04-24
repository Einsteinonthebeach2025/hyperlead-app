import SignUpForm from "./signUp/SignUpForm";
import Link from "next/link";
import FlexBox from "app/components/containers/FlexBox";
import MotionContainer from "app/components/containers/MotionContainer";
import FormContainer from "app/components/containers/FormContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";

const SignUpComponent = () => {
  return (
    <div className="h-screen center">
      <FormContainer className="w-[90%] max-w-[500px] space-y-2">
        <MotionContainer animation="zoom-out">
          <Title>SIGN UP</Title>
        </MotionContainer>
        <SignUpForm />
        <FlexBox type="row">
          <Paragraph>Already have an account?</Paragraph>
          <Link className="text-blue-500 hover:underline" href="/signin">
            Login
          </Link>
        </FlexBox>
      </FormContainer>
    </div>
  );
};

export default SignUpComponent;
