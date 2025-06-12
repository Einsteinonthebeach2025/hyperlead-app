"use client";
import CardContainer from "app/components/containers/CardContainer";
import dynamic from "next/dynamic";
import CountryStats from "./components/CountryStats";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import ShowAllStats from "./components/ShowAllStats";
import Button from "app/components/buttons/Button";
import ContentHeadline from "app/components/ContentHeadline";
const WorldMap = dynamic(() => import("./components/WorldMap"), {
  ssr: false,
});

const LeadsByRegions = ({ data }) => {

  const { isOpen, toggleState } = useToggleLocal();

  if (!data || data.length === 0) return <div>No data available</div>;
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const handleShowAll = () => {
    toggleState(!isOpen);
  };

  return (
    <CardContainer className="space-y-2 w-full mx-auto relative overflow-hidden ">
      <ContentHeadline
        type="column-start"
        title="Geographic Pulse of Your Leads"
        desc=" Visual breakdown of where your most leads are coming from this month"
      />
      <Button onClick={handleShowAll} type="blue">
        show all
      </Button>
      <WorldMap sortedData={sortedData} />
      <CountryStats data={sortedData} total={total} />
      <ShowAllStats data={data} isOpen={isOpen} handleShowAll={handleShowAll} />
    </CardContainer>
  );
};

export default LeadsByRegions;
