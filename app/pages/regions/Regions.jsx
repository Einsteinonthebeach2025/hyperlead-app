"use client";
import dynamic from "next/dynamic";
import SelectionForm from "app/components/SelectionForm";
import regionsData from "app/localDB/regionsData";

const WorldMap = dynamic(
  () =>
    import("../dashboard/activities/leadsByRegionsStats/components/WorldMap"),
  {
    ssr: false,
  }
);

const Regions = ({ initialRegions = [] }) => {
  return (
    <SelectionForm
      className="h-screen"
      title="Define Your Target Regions"
      description="By selecting one or more regions, your lead recommendations will be filtered accordingly. If no regions are selected, you'll automatically receive unfiltered leads from all available areas nationwide."
      data={regionsData}
      initialSelections={initialRegions}
      updateField="region"
      successMessage="Regions updated successfully"
      additionalComponents={<WorldMap sortedData={[]} />}
    />
  );
};

export default Regions;
