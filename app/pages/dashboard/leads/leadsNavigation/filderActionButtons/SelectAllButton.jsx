"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectLeads, toggleSelectedLead } from "app/features/modalSlice";
import { FaCheck } from "react-icons/fa";
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
      // If all are selected, deselect all
      currentPageLeads.forEach(lead => {
        if (selectedLeads.some(selectedLead => selectedLead.id === lead.id)) {
          dispatch(toggleSelectedLead(lead));
        }
      });
    } else {
      // If not all are selected, select all
      currentPageLeads.forEach(lead => {
        if (!selectedLeads.some(selectedLead => selectedLead.id === lead.id)) {
          dispatch(toggleSelectedLead(lead));
        }
      });
    }
  };



  return (
    <Button type="success" onClick={handleSelectAll}>
      {allSelected ?
        <span className="w-19">Remove Leads</span>
        :
        <span className="w-19">Select Leads</span>
      }
      <FaCheck size={12} />
    </Button>
  );
};

export default SelectAllButton;