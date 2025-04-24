"use client";
import { setToggle } from "app/features/modalSlice";
import { FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const EmailButton = ({ lead }) => {
  const dispatch = useDispatch();

  const emailModal = (e) => {
    e.stopPropagation();
    dispatch(setToggle({ isOpen: true, data: lead }));
  };

  return (
    <div onClick={emailModal} className="cursor-pointer hover:text-indigo-600">
      <FaEnvelope />
    </div>
  );
};

export default EmailButton;
