import { selectUser } from "app/features/userSlice";
import { useSelector } from "react-redux";
import { FaCheck, FaTriangleExclamation } from "react-icons/fa6";
import FlexBox from "app/components/containers/FlexBox";
import Spinner from "app/components/Spinner";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import HoverModal from "app/components/HoverModal";

const SubscribtionStatus = () => {
  const user = useSelector(selectUser);
  const subs = user?.profile?.subscription;
  const { isOpen, toggleState } = useToggleLocal();

  const subscriptionDate = new Date(user?.profile?.subscription_timestamp);
  const endDateObj = new Date(subscriptionDate);
  endDateObj.setMonth(endDateObj.getMonth() + 1);
  const year = endDateObj.getFullYear();
  const month = String(endDateObj.getMonth() + 1).padStart(2, "0");
  const day = String(endDateObj.getDate()).padStart(2, "0");
  const hours = String(endDateObj.getHours()).padStart(2, "0");
  const minutes = String(endDateObj.getMinutes()).padStart(2, "0");
  const endDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  const divStyle = `relative text-[12px] gap-2 font-medium px-2 py-1 w-fit border-2 rounded-md ${subs ? "text-green-500 bg-green-100 border-green-400" : "text-red-500 bg-red-100 border-red-400"}`;

  if (!subs) {
    return <Spinner />;
  }

  return (
    <>
      {subs ? (
        <FlexBox
          onMouseEnter={() => toggleState(true)}
          onMouseLeave={() => toggleState(false)}
          type="center-row"
          className={divStyle}
        >
          <FaCheck />
          <span className="pointer-events-none">{subs} plan is active</span>
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
