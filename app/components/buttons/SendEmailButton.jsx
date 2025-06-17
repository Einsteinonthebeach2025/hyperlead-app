"use client";
import { selectLeads, setToggle } from "app/features/modalSlice";
import { FaEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import Button from "app/components/buttons/Button";
import HoverModal from "../modals/HoverModal";
import FlexBox from "../containers/FlexBox";

const SendEmailButton = ({ lead, type = 'lead' }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const selectedUsers = leads.filter(lead => lead.type === 'user');
  const { isOpen, toggleState } = useToggleLocal();

  const emailModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'lead') {
      const leadsToEmail = leads.length > 0 ? leads : [lead];
      dispatch(setToggle({
        modalType: 'email',
        isOpen: true,
        data: leadsToEmail
      }));
    } else if (type === 'user') {
      const usersToEmail = selectedUsers.length > 0 ? selectedUsers : [lead];
      dispatch(setToggle({
        modalType: 'email',
        isOpen: true,
        data: usersToEmail
      }));
    }
  };

  return (
    <>
      {type === "user" ? (
        <Button onClick={emailModal} type="blue" className="w-fit">
          <span>Send email</span>
          <FaEnvelope size={15} />
        </Button>
      ) : (
        <>
          <FlexBox
            onMouseEnter={() => toggleState(true)}
            onMouseLeave={() => toggleState(false)}
            onClick={emailModal}
            className="cursor-pointer duration-300 text-blue-600 hover:text-blue-800"
          >
            <FaEnvelope />
          </FlexBox>
          <HoverModal
            isOpen={isOpen}
            className="right-10 top-1"
            text="Send email"
          />
        </>
      )}
    </>
  );
};

export default SendEmailButton;
