import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";

export const metadata = {
  title: "Hyperlead | Analytics",
  description: "Analytics",
};

const AnalyticsPage = () => {
  return (
    <MotionContainer animation="fade-in">
      <Headline className="w-fit">Dashboard</Headline>
    </MotionContainer>
  );
};

export default AnalyticsPage;
