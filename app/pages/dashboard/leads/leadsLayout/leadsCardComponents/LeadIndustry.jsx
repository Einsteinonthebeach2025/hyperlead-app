import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";

const LeadIndustry = ({ lead = {} }) => {
  const industryColorMap = {
    "marketing & advertising": "blue",
    "real estate": "green",
    "coach & consulting": "purple",
    "e-commerce": "gold",
    "wellness & fitness": "red",
    "information technology": "gold",
    "financial services": "red",
    "legal services": "blue",
    "media & entertainment": "red",
  };

  const industries = lead?.industry || [];
  const normalizedIndustry = industries?.map(
    (i) => i?.toLowerCase()?.trim() || ""
  );
  const matchedColor = Object.keys(industryColorMap).find((key) =>
    normalizedIndustry.includes(key)
  );

  const color = matchedColor ? industryColorMap[matchedColor] : "red";
  return (
    <FlexBox>
      <SpanContainer color={color}>
        {industries.length > 0 ? industries.join(" • ") : "No Industry"}
      </SpanContainer>
    </FlexBox>
  );
};

export default LeadIndustry;
