import FlexBox from "app/components/containers/FlexBox";
import Logo from "app/components/Logo";
import SectionHeadline from "app/components/SectionHeadline";
import Button from "app/components/buttons/Button";

const SignUpAlertPage = ({ title, desc }) => {
  return (
    <FlexBox type="center-col" className="space-y-6">
      <Logo />
      <SectionHeadline title={title} desc={desc} />
      <FlexBox type="row" className="space-x-4">
        <Button href="/signin" type="blue">
          Sign In
        </Button>
        <Button href="/signup">Sign Up</Button>
      </FlexBox>
    </FlexBox>
  );
};

export default SignUpAlertPage;
