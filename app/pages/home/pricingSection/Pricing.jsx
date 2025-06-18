import PricingList from "./components/PricingList";
import MobileSwiper from "./MobileSwiper";
import SectionHeadline from "app/components/SectionHeadline";

const SectionPricing = () => {
  return (
    <section id="pricing" className="w-full center flex-col">
      <SectionHeadline
        title="Simple Pricing. Powerful Results."
        desc="Get verified B2B leads, AI outreach tools, and campaign automation—all in one simple plan."
      />
      <h1>Annual pricing here</h1>

      <PricingList />
      <MobileSwiper />
    </section>
  );
};

export default SectionPricing;
