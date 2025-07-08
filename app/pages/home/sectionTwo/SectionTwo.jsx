import SectionHeadline from "app/components/SectionHeadline";
import ContentList from "./ContentList";


const SectionTwo = () => {
  return (
    <section id="features">
      <SectionHeadline
        className="lg:px-[10%]"
        title="Lead Generation & Outreach All in One Platform"
        desc="Find, qualify, and engage high-intent leads effortlessly with AI-driven automation. Scale your business faster."
      />
      <ContentList />
    </section>
  );
};

export default SectionTwo;
