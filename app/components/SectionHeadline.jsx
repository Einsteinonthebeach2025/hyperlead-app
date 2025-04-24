import MotionChildren from "./containers/MotionChildren";
import MotionContainer from "./containers/MotionContainer";

const SectionHeadline = ({ title, desc, className, children }) => {
  return (
    <MotionContainer
      animation="zoom-out"
      className={`${className} space-y-5 center flex-col px-3 py-10 lg:py-20`}
    >
      <MotionChildren
        animation="zoom-out"
        className="text-3xl md:text-5xl text-center lg:text-6xl font-bold tracking-tight capitalize"
      >
        {title}
      </MotionChildren>
      <p className="text-base md:text-lg text-center text-gray-600 max-w-3xl mx-auto">
        {desc}
      </p>
      {children}
    </MotionContainer>
  );
};

export default SectionHeadline;
