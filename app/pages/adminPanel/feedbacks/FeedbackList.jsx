"use client"
import CardContainer from 'app/components/containers/CardContainer';
import SpanContainer from 'app/components/containers/SpanContainer';
import Paragraph from 'app/components/Paragraph';
import SubTitle from 'app/components/SubTitle';
import { formatTime } from 'app/helpers/utils';
import Stars from 'app/pages/home/feedbackSection/feedbackCard/Stars';
import { AnimatePresence, motion } from 'framer-motion';
import ActionButtons from '../bugs/ActionButtons';
import { useState } from 'react';
import SpanText from 'app/components/SpanText';

const FeedbackList = ({ data }) => {
  const [feedback, setFeedback] = useState(data);

  const handleDelete = (deletedId) => {
    setFeedback(prev => prev.filter(fb => fb.id !== deletedId));
  };

  console.log(feedback);


  return (
    <div className="grid grid-cols-2 gap-3">
      <AnimatePresence mode="popLayout">
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: 0.5 }}
          >
            <CardContainer key={item.id} className="space-y-3">
              <Stars item={item} />
              <SubTitle>{item.header}</SubTitle>
              <Paragraph>{item.review}</Paragraph>
              <SpanContainer color="gold" className="w-fit">{formatTime(item.created_at)}</SpanContainer>
              <div className='space-y-1'>
                <SpanText>from <strong className='lowercase'>{item.users.email}</strong></SpanText>
                <SpanText>status: <strong>{item.status}</strong></SpanText>
                <ActionButtons
                  item={item}
                  onDelete={handleDelete}
                  type="feedback"
                />
              </div>
            </CardContainer>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList