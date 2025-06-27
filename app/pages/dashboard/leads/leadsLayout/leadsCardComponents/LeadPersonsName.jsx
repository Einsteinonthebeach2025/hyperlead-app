import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import CheckMarkButton from "../../../../../components/buttons/CheckMarkButton";
import CopyEmail from "./CopyEmail";
import SpanText from "app/components/SpanText";
import { truncateString } from "app/helpers/utils";
import { MdOutlineMail } from "react-icons/md";

const LeadPersonsName = ({ lead = {}, colorTheme }) => {
  return (
    <FlexBox type="row" className="gap-5 items-center">
      <FlexBox type="column" className="gap-2">
        <CheckMarkButton lead={lead} />
      </FlexBox>
      <PersonName lead={lead} colorTheme={colorTheme} />
    </FlexBox>
  );
};

const PersonName = ({ lead, colorTheme }) => {
  return (
    <div className="flex items-center gap-3">
      <PersonInitials lead={lead} colorTheme={colorTheme} />
      <FlexBox type="column-center" className="leading-2">
        <SpanText>{lead?.seniority}</SpanText>
        <SubTitle>
          {lead?.first_name} {lead?.last_name}
        </SubTitle>
        <FlexBox className="gap-1 items-center bg-cyan-200/20 dark:bg-transparent px-2 dark:px-0 rounded-full">
          <MdOutlineMail size={13} className="text-neutral-500" />
          <SpanText className="mt-[1px] lowercase">
            {truncateString(lead?.email, 35)}
          </SpanText>
          <CopyEmail lead={lead} />
        </FlexBox>
      </FlexBox>
    </div>
  );
};

const PersonInitials = ({ lead, colorTheme }) => {
  const initials = `${lead.first_name?.[0] ?? ""}${lead.last_name?.[0] ?? ""
    }`.toUpperCase();

  const colorClasses = {
    violet: "text-violet-500 dark:text-violet-800 bg-violet-200 group-hover:bg-violet-300 dark:bg-violet-400 group-hover:dark:bg-violet-500",
    green: "text-green-500 dark:text-green-800 bg-green-200 group-hover:bg-green-300 dark:bg-green-400 group-hover:dark:bg-green-500",
    blue: "text-blue-500 dark:text-blue-800 bg-blue-200 group-hover:bg-blue-300 dark:bg-blue-400 group-hover:dark:bg-blue-500",
  };

  const selectedColorClass = colorClasses[colorTheme] || "text-rose-500 dark:text-rose-100 bg-rose-200 group-hover:bg-rose-300 dark:bg-rose-400 group-hover:dark:bg-rose-500";

  return (
    <span className={`w-8 h-8 flex items-center justify-center duration-300 rounded-full font-medium text-[14px] ${selectedColorClass}`}>
      {initials}
    </span>
  );
};

export default LeadPersonsName;
