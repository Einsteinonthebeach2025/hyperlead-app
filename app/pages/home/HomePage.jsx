import FeebackSlider from "./feedbackSection/FeebackSlider";
import Hero from "./heroSection/Hero";
import Faq from "./faqSection/Faq";
import Pricing from "./pricingSection/Pricing";

const HomePage = () => {
  return (
    <main className="center flex-col space-y-20">
      <Hero />
      <FeebackSlider />
      <Pricing />
      <Faq />
    </main>
  );
};

export default HomePage;
