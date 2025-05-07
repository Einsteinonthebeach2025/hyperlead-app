import MotionChildren from "./containers/MotionChildren";
import FlexBox from "./containers/FlexBox";
import Title from "./Title";
import Paragraph from "./Paragraph";

const ContentHeadline = ({ title, desc, className, type }) => {
  return (
    <MotionChildren animation="fade-in" className={className}>
      <FlexBox type={type}>
        <Title>{title}</Title>
        <Paragraph>{desc}</Paragraph>
      </FlexBox>
    </MotionChildren>
  );
};

export default ContentHeadline;
