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
        title="Hyperleads"
        desc="Recommended leads"
      />
      <RandomLeadList data={data} />
    </CardContainer>
  );
};

export default RandomTopLeads;