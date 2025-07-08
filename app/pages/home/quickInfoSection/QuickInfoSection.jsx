import ImageComponent from "app/components/ImageComponent";
import SectionHeadline from "app/components/SectionHeadline";
import ContentList from "./ContentList";


const SectionThree = () => {
    return (
        <section className="center flex-col w-full">
            <SectionHeadline
                className="lg:px-[17%]"
                title="Smart Email Assistant, Built Into Your Workflow"
                desc="Describe what you want to say. our built-in AI turns your prompt into a personalized, high-converting email in seconds. No copywriting skills needed."
            />
            <ImageComponent src="/assets/sectionthree.jpg" alt="section three" className="*:scale-[1.02]" />
            <ContentList />
        </section>
    );
};

export default SectionThree;
