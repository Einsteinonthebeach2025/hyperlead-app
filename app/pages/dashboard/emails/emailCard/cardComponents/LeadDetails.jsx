"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import Delete from "app/components/buttons/Delete";
import { FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { deleteEmail } from "app/lib/actions/emailActions";
import { useRouter } from "next/navigation";

const LeadDetails = ({ item, onDelete }) => {
  const { leads } = item;
  const router = useRouter();

  const handleEmailDelete = async (emailId) => {
    try {
      const { success, error } = await deleteEmail(emailId);
      if (!success) {
        return error;
      }
      if (onDelete) {
        onDelete(emailId);
      }
      router.refresh();
      return null;
    } catch (error) {
      return "Failed to delete email";
    }
  };

  return (
    <FlexBox
      type="row-between"
      className="w-full border-b border-neutral-200 pb-3"
    >
      <div className="pointer-events-none">
        <FlexBox className="gap-2 w-fit">
          <SubTitle>
            {leads?.first_name} {leads?.last_name}
          </SubTitle>
          •
          <span className="text-neutral-600 font-light">
            {leads?.seniority}
          </span>
        </FlexBox>
        <h1 className="text-[12px] text-neutral-600">{item?.leads_email}</h1>
        <h1 className="text-[12px] text-green-500 italic font-bold">
          {leads?.company_title}
        </h1>
      </div>
      <div className="flex gap-2 h-fit">
        <FlexBox
          type="row-center"
          className="gap-2 *:duration-300 *:cursor-pointer *:text-blue-700 *:hover:text-blue-500"
        >
          <a href={leads?.website} target="_blank">
            <TbWorld size={20} />
          </a>
          <a href={leads?.linkedin_url} target="_blank">
            <FaLinkedin size={20} />
          </a>
        </FlexBox>
        <Delete
          id={item.id}
          onDelete={handleEmailDelete}
          type="email"
        />
      </div>
    </FlexBox>
  );
};

export default LeadDetails;
