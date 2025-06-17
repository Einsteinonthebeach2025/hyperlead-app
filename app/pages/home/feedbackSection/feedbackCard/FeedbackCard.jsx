"use client";
import Stars from "./Stars";
import Author from "./Author";
import { motion } from "framer-motion";
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import { infinityScroll } from "app/animationValues/motionVariants";
import { truncateString } from "app/helpers/utils";

const FeedbackCard = ({ feedbacks }) => {

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
            className="flex flex-col justify-between overflow-hidden w-[170px] h-44 lg:w-[350px] mx-2 lg:h-80"
            type="light"
            key={item.id}
          >
            <div>
              <Stars item={item} />
              <FlexBox type="column-start">
                <h1 className="capitalize text-[10px] lg:text-base dark:text-neutral-100 font-bold">{truncateString(header, 30)}</h1>
                <p className="text-[6px] lg:text-[13px] dark:text-stone-300 whitespace-pre-wrap">{review}</p>
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
