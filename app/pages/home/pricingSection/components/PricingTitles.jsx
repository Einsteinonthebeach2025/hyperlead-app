import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";
import Title from "app/components/Title";

const PricingTitle = ({ item, pricingMode = "monthly" }) => {
  if (!item) {
    return null;
  }
  const price = pricingMode === "annual" ? item.annualPrice : item.price;
  const period = pricingMode === "annual" ? "Year" : "Month";
  return (
    <div>
      <FlexBox type="row-between" className="items-center">
        <Title>{item.title}</Title>
        {item.color && (
          <SpanContainer >
            <span className="pointer-events-none">Most Popular</span>
          </SpanContainer>
        )}
      </FlexBox>
      <div className="leading-4">
        <span className="text-neutral-500 dark:text-stone-300 text-[12px]">{item.desc}</span>
      </div>
      <Title className="text-4xl">
        {price}$ <span className="font-light"> {period}</span>
      </Title>
    </div>
  );
};

export default PricingTitle;
