import MotionChildren from "./containers/MotionChildren";
import MotionContainer from "./containers/MotionContainer";

const SectionHeadline = ({ title, desc, className, children }) => {
  return (
    <MotionContainer
      type="in-view"
      animation="zoom-out"
      className={`${className} space-y-5 center flex-col px-3 py-5 lg:py-10`}
    >
      <MotionChildren
        animation="zoom-out"
        className="text-3xl md:text-5xl text-center lg:text-6xl font-bold tracking-tight capitalize dark:text-stone-300"
      >
        {title}
      </MotionChildren>
      <p className="text-base md:text-lg text-center text-gray-600 max-w-3xl mx-auto dark:text-stone-300">
        {desc}
      </p>
      {children}
    </MotionContainer>
  );
};

export default SectionHeadline;
