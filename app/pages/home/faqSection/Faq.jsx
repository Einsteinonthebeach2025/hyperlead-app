import SectionHeadline from "app/components/SectionHeadline";
import FaqAccordion from "./FaqAccordion";

const SectionFaq = () => {
  return (
    <section>
      <SectionHeadline title="FAQ" desc="Frequently Asked Questions" />
      <FaqAccordion />
    </section>
  );
};

export default SectionFaq;
