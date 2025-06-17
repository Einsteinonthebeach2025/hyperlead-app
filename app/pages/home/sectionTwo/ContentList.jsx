import CardContainer from "app/components/containers/CardContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import sectionTwoData from "app/localDB/sectionTwoData";
import Image from "next/image";

const ContentList = () => {
  return (
    <MotionContainer
      animation="zoom-out"
      type="in-view"
      className="px-3 md:px-[12%]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MotionChildren animation="zoom-out" className="md:col-span-2">
          <CardContainer>
            <div className="w-full">
              <Image
                className="w-full h-full"
                src={sectionTwoData[0].image}
                alt={sectionTwoData[0].title}
                width={400}
                height={400}
                quality={85}
              />
            </div>
            <article className="space-y-1">
              <Title>{sectionTwoData[0].title}</Title>
              <Paragraph>{sectionTwoData[0].desc}</Paragraph>
            </article>
          </CardContainer>
        </MotionChildren>
        <MotionChildren animation="zoom-out">
          <CardContainer>
            <div className="w-full">
              <Image
                src={sectionTwoData[1].image}
                alt={sectionTwoData[1].title}
                width={400}
                height={400}
                quality={85}
              />
            </div>
            <article className="space-y-1">
              <Title>{sectionTwoData[1].title}</Title>
              <Paragraph>{sectionTwoData[1].desc}</Paragraph>
            </article>
          </CardContainer>
        </MotionChildren>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sectionTwoData.slice(2, 5)?.map((item) => (
          <MotionChildren
            key={item.id}
            animation="zoom-out"
          >
            <CardContainer>
              <div className="w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  quality={85}
                />
              </div>
              <article className="space-y-1">
                <Title>{item.title}</Title>
                <Paragraph>{item.desc}</Paragraph>
              </article>
            </CardContainer>
          </MotionChildren>
        ))}
      </div>
    </MotionContainer>
  );
};

export default ContentList;
