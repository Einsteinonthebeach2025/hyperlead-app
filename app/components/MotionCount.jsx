'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import FlexBox from 'app/components/containers/FlexBox';
import SubTitle from './SubTitle';
import SpanContainer from './containers/SpanContainer';

const MotionCount = ({ data, title }) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, data, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayedCount(Math.floor(latest));
      },
    });
    return () => controls.stop();
  }, [data]);

  return (
    <FlexBox type="column" className="items-center h-full px-5 gap-2">
      <SpanContainer >
        <motion.div
          className="text-5xl font-extrabold mb-1 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {displayedCount.toLocaleString()}
        </motion.div>
      </SpanContainer>
      <SubTitle>{title}</SubTitle>
    </FlexBox>
  );
};

export default MotionCount;
