import CardContainer from "app/components/containers/CardContainer";
import ContentHeadline from "app/components/ContentHeadline";
import SubTitle from "app/components/SubTitle";

const IndustryStats = ({ data }) => {
  return (
    <CardContainer className="space-y-2">
      <ContentHeadline
        type="column-start"
        title="Your Leads"
        desc="According to industries"
      />
      <div className="grid grid-cols-2 gap-4">
        {data &&
          Object.entries(data).map(([preference, count]) => (
            <div type="blue" className="flex-col capitalize" key={preference}>
              <SubTitle>{preference}</SubTitle>
              <h1>{count}</h1>
            </div>
          ))}
      </div>
    </CardContainer>
  );
};

export default IndustryStats;
