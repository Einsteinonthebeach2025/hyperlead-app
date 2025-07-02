import GradientContainer from "app/components/containers/GradientContainer";
import SectionHeadline from "app/components/SectionHeadline";
import ParticlesAnimation from "../ParticlesAnimation";

const Hero = () => {
  return (
    <div className="center w-full relative h-screen">
      <GradientContainer type="sky" />
      <ParticlesAnimation />
      <SectionHeadline
        className="lg:px-[25%] relative z-[2]"
        title="Get High-Quality Business Leads Every Month - Powered by Smart AI Tools"
        desc="Connect with verified decision-makers like CEOs, founders, and other key roles who match your exact criteria. Fresh, high-quality leads delivered automatically."
      >
      </SectionHeadline>
    </div>
  );
};

export default Hero;
