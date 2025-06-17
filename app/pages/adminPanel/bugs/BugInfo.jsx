import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Paragraph from 'app/components/Paragraph';
import SubTitle from 'app/components/SubTitle';
import SpanText from 'app/components/SpanText';
import { truncateString } from 'app/helpers/utils';
import MotionContainer from 'app/components/containers/MotionContainer';
import Close from 'app/components/buttons/Close';

const BugInfo = ({ item }) => {
  const [showFull, setShowFull] = useState(false);

  const toggleReadMore = () => {
    setShowFull(prev => !prev);
  };

  const isLongText = item.message.length > 250;
  const displayedText = isLongText
    ? `${truncateString(item.message, 250)}... `
    : item.message;

  return (
    <>
      <div className="space-y-2">
        <SubTitle>{item.header}</SubTitle>
        <Paragraph>
          {displayedText}
          {isLongText && (
            <span
              onClick={toggleReadMore}
              className="text-blue-500 cursor-pointer hover:underline text-[10px]"
            >
              Read More
            </span>
          )}
        </Paragraph>
      </div>

      <ReadMore show={showFull} onClose={toggleReadMore}>{item.message}</ReadMore>

    </>
  );
};

const ReadMore = ({ children, onClose, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <MotionContainer
          animation="fade-in"
          className="absolute inset-0 bg-neutral-100 dark:bg-[#2c455e] p-5 flex flex-col z-10"
        >
          <Close className='absolute top-2 right-2 dark:text-white' onClick={onClose} />
          <SpanText className="mt-5">{children}</SpanText>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default BugInfo;
