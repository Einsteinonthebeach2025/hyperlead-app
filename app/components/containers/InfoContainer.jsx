import React from "react";
import FlexBox from "./FlexBox";

const InfoContainer = ({ text, subText }) => {
  return (
    <FlexBox type="column-start">
      <span className="text-[12px] text-neutral-500">{text}</span>
      <h1 className="font-medium text-sm capitalize">{subText}</h1>
    </FlexBox>
  );
};

export default InfoContainer;
