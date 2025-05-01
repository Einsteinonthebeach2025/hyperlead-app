import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";

export const metadata = {
  title: "HYPERLEAD | My Analytics",
  description: "My Analytics",
};

const AnalyticsLayout = ({
  basicStatistics,
  usedLeadsStatistics,
  emailStatistics,
  leadsRegionStatistics,
  employeeStatistics,
}) => {
  return (
    <div className="pr-4">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">Dashboard</Headline>
      </MotionContainer>
      {basicStatistics}
      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 py-4">
        {usedLeadsStatistics}
        {emailStatistics}
        {employeeStatistics}
      </div>
      <div className="grid grid-cols-2 gap-4 pb-4">{leadsRegionStatistics}</div>
    </div>
  );
};

export default AnalyticsLayout;
