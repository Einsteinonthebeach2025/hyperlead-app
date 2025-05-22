import React from "react";
import FlexBox from "./FlexBox";

const InfoContainer = ({ text, subText }) => {
  const isEmail = typeof subText === "string" && subText.includes("@");
  const displayText = isEmail
    ? subText.toLowerCase()
    : typeof subText === "string"
      ? subText.charAt(0).toUpperCase() + subText.slice(1)
      : subText

  return (
    <FlexBox type="column-start">
      <span className="text-[12px] text-neutral-500">{text}</span>
      <h1 className="font-medium text-sm">{displayText}</h1>
    </FlexBox>
  );
};

export default InfoContainer;
