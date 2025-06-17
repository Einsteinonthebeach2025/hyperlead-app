"use client";
import IconContainer from "app/components/containers/IconContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import quickInfoData from "app/localDB/quickInfoData";

const ContentList = () => {
  return (
    <div className="overflow-hidden">
      <div
        className="flex flex-col px-5 md:flex-row space-y-10 md:space-y-0 md:px-[12%] md:space-x-10 mt-10"
      >
        {quickInfoData?.map((item) => {
          return (
            <div className="center flex-col space-y-5" key={item.id}>
              <IconContainer size="lg">
                <span className="text-2xl">
                  {item.icon}
                </span>
              </IconContainer>
              <div className="center flex-col">
                <Title className="text-center">{item.title}</Title>
                <Paragraph className="text-center">{item.desc}</Paragraph>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentList;
