import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import pricingData from "app/localDB/pricingData";
import PricingTitle from "./PricingTitles";
import Benefits from "./Benefits";
import PricingButton from "./PricingButton";

const PricingList = () => {
  if (!pricingData || !pricingData.length) {
    return null;
  }

  return (
    <MotionContainer
      animation="fade-in"
      type="in-view"
      className="hidden md:grid md:grid-cols-3 lg:px-[10%] space-x-5"
    >
      {pricingData?.map((item) => {
        return (
          <MotionChildren
            animation="fade-in"
            key={item.id}
            className={`primary-border flex flex-col justify-between items-center space-y-5 ${
              item.color ? "bg-violet-300/30" : "bg-[#f8fafc]"
            }`}
          >
            <div>
              <PricingTitle item={item} />
              <Benefits item={item} />
            </div>
            <PricingButton item={item} />
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default PricingList;
