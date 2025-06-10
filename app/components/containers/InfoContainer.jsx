import React from "react";
import FlexBox from "./FlexBox";

const InfoContainer = ({ text, subText, children }) => {
  const isEmail = typeof subText === "string" && subText.includes("@");
  const displayText = isEmail
    ? subText.toLowerCase()
    : typeof subText === "string"
      ? subText.charAt(0).toUpperCase() + subText.slice(1)
      : subText

  return (
    <FlexBox type="row-between" className="items-end">
      <FlexBox type="column-start">
        <span className="text-[12px] text-neutral-500 dark:text-neutral-300">{text}</span>
        <h1 className="font-medium text-sm dark:text-neutral-100">{displayText}</h1>
      </FlexBox>
      <div>
        {children}
      </div>
    </FlexBox>
  );
};

export default InfoContainer;
