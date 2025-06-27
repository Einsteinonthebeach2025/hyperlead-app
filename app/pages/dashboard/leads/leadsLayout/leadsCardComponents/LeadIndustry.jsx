import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";

const LeadIndustry = ({ lead = {} }) => {
  const industries = lead?.industry || [];

  return (
    <FlexBox type="column-start" className="items-center gap-2">
      {industries.slice(0, 2).map((item) => {
        return <SpanContainer color="blue" key={item}>
          {item}
        </SpanContainer>
      })}
    </FlexBox>
  );
};

export default LeadIndustry;
