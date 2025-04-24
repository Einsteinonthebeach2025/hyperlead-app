import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import MarkButton from "../leadActionButtons/MarkButtons";
import EmailButton from "../leadActionButtons/EmailButton";

const LeadPesronsName = ({ lead = {}, onStatusChange }) => {
  return (
    <FlexBox type="row" className="gap-5 items-center">
      <FlexBox type="column" className="gap-2">
        <MarkButton lead={lead} onStatusChange={onStatusChange} />
        <EmailButton lead={lead} />
      </FlexBox>
      <div className="flex items-center gap-3">
        <PersonInitials lead={lead} />
        <FlexBox type="column-center">
          <SubTitle>
            {lead?.first_name} {lead?.last_name}
          </SubTitle>
          <span className="text-neutral-500 font-medium text-[12px]">
            {lead?.email}
          </span>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

const PersonInitials = ({ lead }) => {
  const initials = `${lead.first_name?.[0] ?? ""}${
    lead.last_name?.[0] ?? ""
  }`.toUpperCase();
  return (
    <span className="text-black bg-amber-400/20 w-7 h-7 flex items-center justify-center group-hover:bg-amber-400/40 duration-300 rounded-full w font-medium text-[14px]">
      {initials}
    </span>
  );
};

export default LeadPesronsName;
