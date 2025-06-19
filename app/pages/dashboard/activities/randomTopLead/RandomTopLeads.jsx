"use client";
import CardContainer from 'app/components/containers/CardContainer';
import ContentHeadline from 'app/components/ContentHeadline';
import RandomLeadList from './RandomLeadList';

const RandomTopLeads = ({ data }) => {

  return (
    <CardContainer className="p-6 grow-1">
      <ContentHeadline
        className="border-bottom"
        type="column-start"
        title="Top Recommended Leads"
        desc="Your highest-quality leads, ranked by match relevance and recent activity.
Smartly filtered by Hyperlead. AI-powered scoring coming soon."
      />
      <RandomLeadList data={data} />
    </CardContainer>
  );
};

export default RandomTopLeads;