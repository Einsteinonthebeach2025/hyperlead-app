import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";

export const metadata = {
  title: "Hyperlead | My Analytics Dashboard",
  description:
    "Track and analyze your leads, email campaigns, industry trends, lead statuses, and subscription details — all personalized in your Hyperlead analytics dashboard.",
};

const ActivitiesPage = () => {
  return (
    <MotionContainer animation="fade-in" className="mt-2">
      <Title className="w-fit">Activities</Title>
    </MotionContainer>
  );
};

export default ActivitiesPage;
