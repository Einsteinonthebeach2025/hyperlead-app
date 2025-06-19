import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import CheckMarkButton from "../../../../../components/buttons/CheckMarkButton";
import { truncateString } from "app/helpers/utils";
import CopyEmail from "./CopyEmail";
import SpanText from "app/components/SpanText";

const LeadPersonsName = ({ lead = {} }) => {
  return (
    <FlexBox type="row" className="gap-5 items-center">
      <FlexBox type="column" className="gap-2">
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
        <FlexBox className="gap-1 items-center bg-neutral-300 dark:bg-transparent px-2 rounded-full">
          <SpanText className="mt-[1px]">
            {truncateString(lead?.email, 35)}
          </SpanText>
          <CopyEmail lead={lead} />
        </FlexBox>
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
101001000
200010 / 2070917