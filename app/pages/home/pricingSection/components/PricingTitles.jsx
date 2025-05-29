import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";
import Title from "app/components/Title";

const PricingTitle = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <div>
      <FlexBox type="row-between" className="items-center">
        <Title>{item.title}</Title>
        {item.color && (
          <SpanContainer color="blue">
            <span className="pointer-events-none">Most Popular</span>
          </SpanContainer>
        )}
      </FlexBox>
      <div className="leading-4">
        <span className="text-neutral-500 dark:text-stone-300 text-[12px]">{item.desc}</span>
      </div>
      <Title className="text-4xl">
        {item.price}$ <span className="font-light"> Month</span>
      </Title>
    </div>
  );
};

export default PricingTitle;
