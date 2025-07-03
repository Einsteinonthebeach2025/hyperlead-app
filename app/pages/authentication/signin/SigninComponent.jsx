import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import Link from "next/link";
import SignInForm from "./SignInForm";
import FlexBox from "app/components/containers/FlexBox";
import Logo from "app/components/Logo";

const SignInComponent = () => {
  return (
    <>
      <div className="h-screen center flex-col space-y-5 w-full ">
        <Logo />
        <FormContainer className="w-[90%] max-w-[400px] space-y-1">
          <MotionContainer animation="zoom-out">
            <Title>SIGN IN</Title>
          </MotionContainer>
          <SignInForm />
          <FlexBox type="row" className="items-center gap-1">
            <Paragraph>Don't have an account? </Paragraph>
            <Link className="text-blue-500 hover:underline" href="/signup">
              Sign Up
            </Link>
          </FlexBox>
        </FormContainer>
      </div>
    </>
  );
};

export default SignInComponent;