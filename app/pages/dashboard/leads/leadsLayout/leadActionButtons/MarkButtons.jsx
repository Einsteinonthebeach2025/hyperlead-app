import FlexBox from "app/components/containers/FlexBox";
import HoverModal from "app/components/HoverModal";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { updateLeadUsedStatus } from "app/lib/actions/leadActions";
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
        <div className="text-green-600">
          {active ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </FlexBox>
      <HoverModal
        isOpen={isOpen}
        className="left-8 bottom-1"
        text={active ? "Mark as unread" : "Mark as read"}
      />
    </>
  );
};

export default MarkButton;
