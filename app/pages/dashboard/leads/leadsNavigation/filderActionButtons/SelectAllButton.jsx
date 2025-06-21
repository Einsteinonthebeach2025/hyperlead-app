"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectLeads, toggleSelectedLead } from "app/features/modalSlice";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Button from "app/components/buttons/Button";

const SelectAllButton = ({ currentPageLeads }) => {
  const dispatch = useDispatch();
  const selectedLeads = useSelector(selectLeads);
  const allSelected = currentPageLeads?.every(lead =>
    selectedLeads.some(selectedLead => selectedLead.id === lead.id)
  );

  const handleSelectAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (allSelected) {
      currentPageLeads.forEach(lead => {
        if (selectedLeads.some(selectedLead => selectedLead.id === lead.id)) {
          dispatch(toggleSelectedLead(lead));
        }
      });
    } else {
      currentPageLeads.forEach(lead => {
        if (!selectedLeads.some(selectedLead => selectedLead.id === lead.id)) {
          dispatch(toggleSelectedLead(lead));
        }
      });
    }
  };



  return (
    <Button type="extra" onClick={handleSelectAll}>
      {allSelected ? <FaMinus size={12} /> : <FaPlus size={12} />}
      {allSelected ?
        <span>Remove All</span>
        :
        <span>Select All</span>
      }
    </Button>
  );
};

export default SelectAllButton;