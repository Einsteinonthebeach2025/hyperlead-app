"use client"
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";
import Paragraph from "app/components/Paragraph";
import SpanText from "app/components/SpanText";
import SubTitle from "app/components/SubTitle";
import UserDisplayAvatar from "app/layout/navigation/usernamepanel/panelComponents/userName/UserDisplayAvatar";
import ActionButtons from "./ActionButtons";
import { formatTime } from "app/helpers/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BugList = ({ bugs }) => {
  const [bugData, setBugData] = useState(bugs);

  const handleBugDelete = (deletedId) => {
    setBugData(prev => prev.filter(bug => bug.id !== deletedId));
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <AnimatePresence mode="popLayout">
        {bugData.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 1 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5 }}
            >
              <CardContainer key={item.id} className="space-y-3">
                <UserInfo item={item} />
                <BugInfo item={item} />
                <ActionButtons item={item} onDelete={handleBugDelete} />
              </CardContainer>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const UserInfo = ({ item }) => {
  return (
    <FlexBox type="row-between" className="items-center">
      <FlexBox type="center-row" className="gap-1">
        <UserDisplayAvatar url={item?.avatar_url} />
        <div className="mb-1">
          <SubTitle className="text-green-500">{item.userName}</SubTitle>
          <SpanText>{item.user_email}</SpanText>
        </div>
      </FlexBox>
      <SpanContainer color="green" className="w-fit">{formatTime(item.created_at)}</SpanContainer>
    </FlexBox>
  );
};

const BugInfo = ({ item }) => {
  return (
    <div className="border-t border-neutral-200 pt-2 space-y-2">
      <div>
        <SubTitle>{item.header}</SubTitle>
        <Paragraph>{item.message}</Paragraph>
      </div>
    </div>
  );
};

export default BugList;
