import FlexBox from "app/components/containers/FlexBox";
import LeadActivities from "./LeadActivities";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";

const Activities = ({ statisticsData }) => {
  return (
    <FlexBox type="column" className="p-4 h-screen">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">Dashboard</Headline>
      </MotionContainer>
      <LeadActivities data={statisticsData} />
    </FlexBox>
  );
};

export default Activities;
