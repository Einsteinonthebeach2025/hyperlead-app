import MotionContainer from "app/components/containers/MotionContainer"
import Headline from "app/components/Headline"
import SectionHeadline from "app/components/SectionHeadline";
import BugList from "./BugList";


const ReportedBugs = ({ bugs, message, desc }) => {

  if (!bugs) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title={message}
          desc={desc}
        />
      </div>
    );
  }

  return (
    <div className="py-3 lg:pr-6 space-y-3">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">bugs</Headline>
      </MotionContainer>
      <BugList bugs={bugs} />
    </div>
  )
}

export default ReportedBugs