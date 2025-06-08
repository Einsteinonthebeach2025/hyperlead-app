import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import CheckMarkButton from "../../../../../components/buttons/CheckMarkButton";
import SendEmailButton from "app/components/buttons/SendEmailButton";

const LeadPersonsName = ({ lead = {} }) => {
  return (
    <FlexBox type="row" className="gap-5 items-center">
      <FlexBox type="column" className="gap-2">
        <SendEmailButton lead={lead} />
        <CheckMarkButton lead={lead} />
      </FlexBox>
      <PersonName lead={lead} />
    </FlexBox>
  );
};

const PersonName = ({ lead }) => {
  return (
    <div className="flex items-center gap-3">
      <PersonInitials lead={lead} />
      <FlexBox type="column-center">
        <SubTitle>
          {lead?.first_name} {lead?.last_name}
        </SubTitle>
        <span className="text-neutral-500 dark:text-stone-300 font-medium text-[12px]">
          {lead?.email}
        </span>
      </FlexBox>
    </div>
  );
};

const PersonInitials = ({ lead }) => {
  const initials = `${lead.first_name?.[0] ?? ""}${lead.last_name?.[0] ?? ""
    }`.toUpperCase();
  return (
    <span className="text-black bg-blue-300 group-hover:bg-blue-400 dark:bg-blue-400/60 group-hover:dark:bg-blue-800 w-8 h-8 flex items-center justify-center duration-300 rounded-full w font-medium text-[14px]">
      {initials}
    </span>
  );
};

export default LeadPersonsName;
