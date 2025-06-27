"use client"
import FlexBox from "app/components/containers/FlexBox";
import HoverModal from "app/components/modals/HoverModal";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { updateLeadUsedStatus } from "app/lib/actions/leadActions";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const MarkButton = ({ lead, onStatusChange }) => {
  const active = lead?.used;
  const { isOpen, toggleState } = useToggleLocal();

  const handleUsedStatus = async (e) => {
    e.preventDefault();
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
        className="bg-green-200/50 dark:bg-green-500/50 relative p-2 duration-300 hover:bg-green-200 rounded-lg"
      >
        <div className="text-green-600 dark:text-green-400">
          {active ? <FaBookmark /> : <FaRegBookmark />}
        </div>
        <HoverModal
          isOpen={isOpen}
          className="right-1 -top-8 w-24"
          text={active ? "Mark as unread" : "Mark as read"}
        />
      </FlexBox>
    </>
  );
};

export default MarkButton;
