import FlexBox from "app/components/containers/FlexBox";
import Card from "./Card";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";

const Plans = () => {
  return (
    <FlexBox type="column-start" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline>Choose Your Plan</Headline>
      </MotionContainer>
      <Card />
    </FlexBox>
  );
};

export default Plans;
