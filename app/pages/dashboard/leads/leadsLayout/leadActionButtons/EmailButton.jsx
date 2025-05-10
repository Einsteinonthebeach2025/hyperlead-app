"use client";
import { selectLeads, setToggle } from "app/features/modalSlice";
import { FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const EmailButton = ({ lead }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);

  const emailModal = (e) => {
    e.stopPropagation();
    const leadsToEmail = leads.length > 0 ? leads : [lead];
    dispatch(setToggle({ isOpen: true, data: leadsToEmail }));
  };

  return (
    <div onClick={emailModal} className="cursor-pointer hover:text-indigo-600">
      <FaEnvelope />
    </div>
  );
};

export default EmailButton;
