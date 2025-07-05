import { useState } from "react";
import PricingList from "./components/PricingList";
import MobileSwiper from "./MobileSwiper";
import SectionHeadline from "app/components/SectionHeadline";
import PlanTypes from "./components/PlanTypes";

const SectionPricing = () => {
  const [pricingMode, setPricingMode] = useState("monthly");
  return (
    <section id="pricing" className="w-full center flex-col">
      <SectionHeadline
        title="Simple Pricing. Powerful Results."
        desc="Get verified B2B leads, AI outreach tools, and campaign automation—all in one simple plan."
      />
      <PlanTypes pricingMode={pricingMode} setPricingMode={setPricingMode} />
      <PricingList pricingMode={pricingMode} />
      <MobileSwiper pricingMode={pricingMode} />
    </section>
  );
};

export default SectionPricing;
