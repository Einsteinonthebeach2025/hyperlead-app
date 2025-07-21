"use client"
import { FaCheck, FaTriangleExclamation } from "react-icons/fa6";
import FlexBox from "app/components/containers/FlexBox";
import Spinner from "app/components/Spinner";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import HoverModal from "app/components/modals/HoverModal";

const SubscribtionStatus = ({ item }) => {
  const subs = item.subscription;
  const { isOpen, toggleState } = useToggleLocal();

  console.log(item);


  const subscriptionDate = new Date(item.subscription_timestamp);
  const endDateObj = new Date(subscriptionDate);
  if (item.subscription_type === "ANNUAL") {
    endDateObj.setFullYear(endDateObj.getFullYear() + 1);
  } else {
    endDateObj.setMonth(endDateObj.getMonth() + 1);
  }
  const year = endDateObj.getFullYear();
  const month = String(endDateObj.getMonth() + 1).padStart(2, "0");
  const day = String(endDateObj.getDate()).padStart(2, "0");
  const hours = String(endDateObj.getHours()).padStart(2, "0");
  const minutes = String(endDateObj.getMinutes()).padStart(2, "0");
  const endDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  const divStyle = `relative text-[12px] gap-2 font-medium px-2 py-1 w-fit border-2 rounded-full ${subs ? "green-style" : "red-style"}`;

  if (!item) {
    return <Spinner />;
  }

  return (
    <>
      {subs ? (
        <FlexBox
          onMouseEnter={() => toggleState(true)}
          onMouseLeave={() => toggleState(false)}
          className={divStyle}
        >
          <FaCheck size={18} />
          <h1 className="pointer-events-none "><span className="uppercase font-bold">{subs}</span> plan is active</h1>
          <HoverModal
            isOpen={isOpen}
            active={false}
            text={`Until ${endDate}`}
            className="-right-5 -bottom-5"
          />
        </FlexBox>
      ) : (
        <FlexBox type="center-row" className={divStyle}>
          <FaTriangleExclamation />
          <span>No active plan</span>
        </FlexBox>
      )}
    </>
  );
};

export default SubscribtionStatus;
