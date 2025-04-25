import Spinner from "app/components/Spinner";
import BasicStats from "./statisticComponents/BasicStats";
import MotionContainer from "app/components/containers/MotionContainer";
import UsedLeadsInsight from "./statisticComponents/usedLeadsInsight/UsedLeadsInsight";

const LeadActivities = ({ data }) => {
  if (!data) {
    return <Spinner />;
  }

  return (
    <MotionContainer animation="fade-in" className="space-y-5 my-5">
      <BasicStats data={data} />
      <div className="relative grid grid-cols-4 gap-4">
        <UsedLeadsInsight data={data} />
      </div>
    </MotionContainer>
  );
};

export default LeadActivities;
