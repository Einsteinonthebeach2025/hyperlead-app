"use client";
import Button from "app/components/buttons/Button";
import { selectLeads, setToggle } from "app/features/modalSlice";
import { FaEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const SendEmailButton = ({ lead, type = 'lead' }) => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const selectedUsers = leads.filter(lead => lead.type === 'user');

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
      {type === "user" ?
        <Button onClick={emailModal} type="gold" className="w-fit">
          <span>Send email</span>
          <FaEnvelope size={15} />
        </Button>
        :
        <div onClick={emailModal} className="cursor-pointer duration-300 hover:text-indigo-600">
          <FaEnvelope />
        </div>}
    </>
  );
};

export default SendEmailButton;
