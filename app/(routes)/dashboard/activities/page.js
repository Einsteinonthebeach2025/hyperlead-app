import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";

export const metadata = {
  title: "Hyperlead | My Analytics",
  description: "User prefered leads provided by Hyperlead",
};

const ActivitiesPage = () => {
  return (
    <MotionContainer animation="fade-in" className="mt-2">
      <Title className="w-fit">Activities</Title>
    </MotionContainer>
  );
};

export default ActivitiesPage;
