import MotionContainer from 'app/components/containers/MotionContainer';
import Headline from 'app/components/Headline';
import SectionHeadline from 'app/components/SectionHeadline';
import FeedbackList from './FeedbackList';

const AdminFeedbacks = ({ data, message, desc }) => {

  if (!data || data.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title={message || "No feedbacks"}
          desc={desc || "Feedbacks are not reported yet"}
        />
      </div>
    );
  }

  return (
    <div className="py-3 lg:pr-6 space-y-3">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">feedbacks</Headline>
      </MotionContainer>
      <FeedbackList data={data} />
    </div>
  )
}

export default AdminFeedbacks