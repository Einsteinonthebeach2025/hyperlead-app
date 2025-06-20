import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import CheckMarkButton from "../../../../../components/buttons/CheckMarkButton";
import CopyEmail from "./CopyEmail";
import SpanText from "app/components/SpanText";
import { truncateString } from "app/helpers/utils";

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
        <FlexBox className="gap-1 items-center bg-neutral-200 dark:bg-transparent px-2 dark:px-0 rounded-full">
          <SpanText className="mt-[1px] lowercase">
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
    <span className="text-rose-500 dark:text-rose-100 bg-rose-200 group-hover:bg-rose-300 dark:bg-rose-400 group-hover:dark:bg-rose-500 w-8 h-8 flex items-center justify-center duration-300 rounded-full w font-medium text-[14px]">
      {initials}
    </span>
  );
};

export default LeadPersonsName;
