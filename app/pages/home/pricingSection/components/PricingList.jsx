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
      className="hidden md:grid md:grid-cols-3 lg:px-[10%] space-x-5 py-5"
    >
      {pricingData?.map((item) => {
        return (
          <MotionChildren
            animation="fade-in"
            key={item.id}
            className={`primary-border hover:shadow-[0_2px_10px_rgba(0,0,0,0.1)] duration-300 flex flex-col justify-between items-center p-5 space-y-5 ${item.color ? "bg-violet-300/30" : "bg-neutral-100 dark:bg-[#1d2939]"
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
