import Button from "app/components/buttons/Button";
import regionsData from "app/localDB/regionsData";

const RegionsForm = ({ setSelectedRegions, selectedRegions }) => {
  const handleRegionToggle = (region) => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) {
        return prev.filter((r) => r !== region);
      }
      return [...prev, region];
    });
  };

  return (
    <div className="w-full max-w-2xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(regionsData).map((region) => (
          <Button
            key={region}
            onClick={() => handleRegionToggle(region)}
            type={selectedRegions.includes(region) ? "blue" : ""}
            className="capitalize center"
          >
            {region}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RegionsForm;
