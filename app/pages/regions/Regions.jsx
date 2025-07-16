"use client";
import dynamic from "next/dynamic";
import SelectionForm from "app/components/SelectionForm";
import regionsData from "app/localDB/regionsData";
import { useRouter } from "next/navigation";

const WorldMap = dynamic(
  () =>
    import("../dashboard/activities/leadsByRegionsStats/components/WorldMap"),
  {
    ssr: false,
  }
);

const Regions = ({ initialRegions = [] }) => {
  const router = useRouter();

  const handleSuccess = async (selections) => {
    try {
      router.push("/dashboard/activities");
    } catch (error) {
      console.error("Error in handleSuccess:", error);
    }
  };

  const handleSkip = async () => {
    try {
      router.push("/dashboard/activities");
    } catch (error) {
      console.error("Error in handleSkip:", error);
    }
  };

  return (
    <SelectionForm
      className="h-screen"
      title="Choose Your Ideal Lead Regions"
      description="Tell us where you want your leads from. We'll filter results based on your selections—so you only get what's relevant to your business."
      data={regionsData}
      initialSelections={initialRegions}
      updateField="region"
      successMessage="Regions updated successfully"
      additionalComponents={<WorldMap sortedData={[]} />}
      onSuccess={handleSuccess}
      onSkip={handleSkip}
      subText="If you don't pick any regions, we'll send you high-quality leads from across the globe."
    />
  );
};

export default Regions;
