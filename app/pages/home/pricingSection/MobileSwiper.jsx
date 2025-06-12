import Swiper from "app/components/containers/Swiper";
import pricingData from "app/localDB/pricingData";
import PricingTitle from "./components/PricingTitles";
import Benefits from "./components/Benefits";
import PricingButton from "./components/PricingButton";

const MobileSwiper = () => {
  if (!pricingData || !pricingData.length) {
    return null;
  }

  return (
    <>
      <h1>Annual pricing here</h1>
      <div className="h-[580px] w-full mt-2">
        <Swiper items={pricingData} className="h-[570px] items-center">
          {pricingData?.map((item, index) => (
            <div
              key={index}
              className={`primary-border p-5 flex flex-col max-w-[330px] mx-auto justify-between items-center space-y-5 ${item.color ? "bg-violet-300/30" : "bg-[#f8fafc]"
                }`}
            >
              <div>
                <PricingTitle item={item} />
                <Benefits item={item} />
              </div>
              <PricingButton item={item} />
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MobileSwiper;
