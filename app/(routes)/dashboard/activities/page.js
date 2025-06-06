import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";

export const metadata = {
  title: "Hyperlead | My Analytics",
  description: "User prefered leads provided by Hyperlead",
};

const ActivitiesPage = () => {
  return (
    <MotionContainer animation="fade-in" className="mb-2">
      <Headline className="w-fit">Activities</Headline>
    </MotionContainer>
  );
};

export default ActivitiesPage;
