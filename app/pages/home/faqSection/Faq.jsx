import SectionHeadline from "app/components/SectionHeadline";
import FaqAccordion from "./FaqAccordion";

const SectionFaq = () => {
  return (
    <section className="pb-10">
      <SectionHeadline title="FAQ" desc="Frequently Asked Questions" />
      <FaqAccordion />
    </section>
  );
};

export default SectionFaq;
