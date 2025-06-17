import Button from "app/components/buttons/Button";
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
        title="Get Warm Business Leads Every Month 100% AI-Powered"
        desc="Start Now – Fully Automated"
      >
        <Button>Start for free</Button>
      </SectionHeadline>
    </div>
  );
};

export default Hero;
