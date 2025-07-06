import Swiper from "app/components/containers/Swiper";
import pricingData from "app/localDB/pricingData";
import PricingTitle from "./components/PricingTitles";
import Benefits from "./components/Benefits";
import PricingButton from "./components/PricingButton";

const MobileSwiper = ({ pricingMode = "monthly" }) => {
  if (!pricingData || !pricingData.length) {
    return null;
  }

  return (
    <>
      <div className="h-[640px] w-full block lg:hidden">
        <Swiper items={pricingData} className="h-[620px] items-center">
          {pricingData?.map((item, index) => (
            <div
              key={index}
              className={`primary-border p-5 flex flex-col max-w-[330px] mx-auto justify-between items-center space-y-5 ${item.color ? "bg-violet-300/30" : "bg-[#f8fafc] dark:bg-[#1d2939]"
                }`}
            >
              <div>
                <PricingTitle item={item} pricingMode={pricingMode} />
                <Benefits item={item} />
              </div>
              <PricingButton item={item} pricingMode={pricingMode} />
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MobileSwiper;
