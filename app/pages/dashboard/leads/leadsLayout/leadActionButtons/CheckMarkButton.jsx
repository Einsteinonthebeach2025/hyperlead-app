import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectLeads, toggleSelectedLead } from "app/features/modalSlice";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import HoverModal from "app/components/modals/HoverModal";

const CheckMarkButton = ({ lead }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const { isOpen, toggleState } = useToggleLocal();
  const isSelected = leads.some((selectedLead) => selectedLead.id === lead.id);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(toggleSelectedLead(lead));
  };

  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => toggleState(true)}
        onMouseLeave={() => toggleState(false)}
        className={`w-4 h-4 relative border-2 border-blue-500 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 ${
          isSelected ? "bg-blue-500 " : "hover:border-blue-500"
        }`}
      >
        {isSelected && <FaCheck className="text-white text-[10px]" />}
      </div>
      <HoverModal
        isOpen={isOpen}
        text={"Mark to sent multiple emails"}
        className="left-8 bottom-1"
      />
    </>
  );
};

export default CheckMarkButton;
