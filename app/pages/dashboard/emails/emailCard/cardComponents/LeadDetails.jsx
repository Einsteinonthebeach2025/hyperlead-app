import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import { FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import DeleteButton from "./DeleteButton";

const LeadDetails = ({ item, onDelete }) => {
  const { leads } = item;
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
          className="gap-2 *:duration-300 *:cursor-pointer"
        >
          <a
            className="text-amber-500 hover:text-amber-400"
            href={leads?.website}
            target="_blank"
          >
            <TbWorld size={20} />
          </a>
          <a
            className="text-blue-700 hover:text-blue-500"
            href={leads?.linkedin_url}
            target="_blank"
          >
            <FaLinkedin size={20} />
          </a>
        </FlexBox>
        <DeleteButton item={item} onDelete={onDelete} />
      </div>
    </FlexBox>
  );
};

export default LeadDetails;
