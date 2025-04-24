import FlexBox from "app/components/containers/FlexBox";
import MotionContainer from "app/components/containers/MotionContainer";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { updateLeadUsedStatus } from "app/lib/actions/leadActions";
import { AnimatePresence } from "framer-motion";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const MarkButton = ({ lead, onStatusChange }) => {
  const active = lead?.used;
  const { isOpen, toggleState } = useToggleLocal();

  const handleUsedStatus = async (e) => {
    e.stopPropagation();
    try {
      const result = await updateLeadUsedStatus(lead.id, !active);
      if (!result.success) {
        console.error("Failed to update lead status:", result.error);
      }
      onStatusChange(lead.id, !active);
    } catch (error) {
      console.error("Error toggling lead status:", error);
    }
  };

  return (
    <>
      <FlexBox
        onMouseEnter={() => toggleState(true)}
        onMouseLeave={() => toggleState(false)}
        onClick={handleUsedStatus}
        className="h-fit"
      >
        <div className="text-red-600">
          {active ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </FlexBox>
      <Hoverable isOpen={isOpen} active={active} />
    </>
  );
};

const Hoverable = ({ isOpen, active }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="zoom-out"
          className=" rounded-md px-2 py-1 absolute shadow-[4px_4px_5px_0px_#909090] left-5 bottom-1 text-white w-fit text-[10px] font-bold  bg-neutral-700 z-10"
        >
          <span>{active ? "Mark as unread" : "Mark as read"}</span>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default MarkButton;
