"use client";
import { selectLeads, setToggle } from "app/features/modalSlice";
import { GoPencil } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import Button from "app/components/buttons/Button";
import HoverModal from "../modals/HoverModal";
import FlexBox from "../containers/FlexBox";
import { FaEnvelope } from "react-icons/fa6";

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
            className="cursor-pointer p-2 bg-blue-200/50 dark:bg-blue-500/50 duration-300 relative text-blue-500 dark:text-blue-300 hover:bg-blue-200 rounded-lg"
          >
            <GoPencil />
            <HoverModal
              isOpen={isOpen}
              className="right-2 -top-8 w-20"
              text="Send email"
            />
          </FlexBox>
        </>
      )}
    </>
  );
};

export default SendEmailButton;
