"use client"
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectLeads, toggleSelectedLead } from "app/features/modalSlice";

const CheckMarkButton = ({ lead, type = 'lead' }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const isSelected = leads.some((selectedLead) => selectedLead.id === lead.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'lead') {
      dispatch(toggleSelectedLead(lead));
    } else if (type === 'user') {
      dispatch(toggleSelectedLead({ ...lead, type: 'user' }));
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`w-4 h-4 relative border-2 border-blue-500 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 ${isSelected ? "bg-blue-500" : "hover:border-blue-500"
          }`}
      >
        {isSelected && <FaCheck className="text-white text-[10px]" />}
      </div>
    </>
  );
};

export default CheckMarkButton;
