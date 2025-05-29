import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";

const LeadIndustry = ({ lead = {} }) => {
  const industries = lead?.industry || [];

  return (
    <FlexBox>
      <SpanContainer color="blue">
        {industries.length > 0 ? industries.join(" • ") : "No Industry"}
      </SpanContainer>
    </FlexBox>
  );
};

export default LeadIndustry;
