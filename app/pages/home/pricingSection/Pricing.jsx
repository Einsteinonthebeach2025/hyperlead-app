import PricingList from "./components/PricingList";
import MobileSwiper from "./MobileSwiper";
import SectionHeadline from "app/components/SectionHeadline";

const SectionPricing = () => {
  return (
    <section className="w-full center flex-col">
      <SectionHeadline
        title="Simple pricing plans"
        desc="Enjoy the power of the best AI modelson a single platform"
      />
      <PricingList />
      <MobileSwiper />
    </section>
  );
};

export default SectionPricing;
