import FlexBox from "app/components/containers/FlexBox";
import MotionChildren from "app/components/containers/MotionChildren";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";

const Header = () => {
  return (
    <MotionChildren animation="fade-in">
      <FlexBox type="center-col">
        <Title>Select Your Preferences</Title>
        <Paragraph>
          Choose any preferences that best match your industry focus
        </Paragraph>
      </FlexBox>
    </MotionChildren>
  );
};

export default Header;
