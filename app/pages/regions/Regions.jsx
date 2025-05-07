"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import MotionContainer from "app/components/containers/MotionContainer";
import Logo from "app/components/Logo";
import ContentHeadline from "app/components/ContentHeadline";
import RegionsForm from "./RegionsForm";
import RegionButtons from "./RegionButtons";

const WorldMap = dynamic(
  () =>
    import("../dashboard/activities/leadsByRegionsStats/components/WorldMap"),
  {
    ssr: false,
  }
);

const Regions = ({ initialRegions = [] }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState(initialRegions);

  return (
    <MotionContainer
      animation="fade-in"
      className="h-screen w-full center flex-col space-y-4"
    >
      <Logo />
      <WorldMap sortedData={[]} />
      <ContentHeadline
        className="w-full lg:w-[45%] *:text-center px-3"
        title="Define Your Target Regions"
        desc="By selecting one or more regions, your lead recommendations will be filtered accordingly. If no regions are selected, you'll automatically receive unfiltered leads from all available areas nationwide."
      />
      <RegionsForm
        setSelectedRegions={setSelectedRegions}
        selectedRegions={selectedRegions}
      />
      <RegionButtons
        loading={loading}
        setLoading={setLoading}
        selectedRegions={selectedRegions}
      />
    </MotionContainer>
  );
};

export default Regions;
