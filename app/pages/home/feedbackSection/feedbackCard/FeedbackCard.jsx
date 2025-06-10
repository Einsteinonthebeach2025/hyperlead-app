"use client";
import Stars from "./Stars";
import Author from "./Author";
import { motion } from "framer-motion";
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import { infinityScroll } from "app/animationValues/motionVariants";

const FeedbackCard = ({ feedbacks }) => {

  console.log(feedbacks);

  return (
    <motion.div
      variants={infinityScroll}
      initial="hidden"
      animate="visible"
      className="flex items-center"
    >
      {feedbacks?.map((item) => {
        const { header, review, userName, email, avatar_url } = item;
        return (
          <CardContainer
            className="flex flex-col justify-between overflow-hidden w-[350px] mx-2 h-80"
            type="light"
            key={item.id}
          >
            <div>
              <Stars item={item} />
              <FlexBox type="column-start">
                <SubTitle className="capitalize">{header}</SubTitle>
                <p className="text-[13px] whitespace-pre-wrap">{review}</p>
              </FlexBox>
            </div>
            <Author item={{ userName, email, avatar_url }} />
          </CardContainer>
        );
      })}
    </motion.div>
  );
};

export default FeedbackCard;
