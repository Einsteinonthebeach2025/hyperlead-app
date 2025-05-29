import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { selectIsDarkMode } from "app/features/modalSlice";
import { countryCoordinates, countryNameToCode } from "app/helpers/utils";
import { useSelector } from "react-redux";

const WorldMap = ({ sortedData = [] }) => {
  const countries = sortedData.slice(0, 5).map((item) => item.country);
  const isDarkMode = useSelector(selectIsDarkMode);


  const markers = countries
    .map((item) => {
      const coords = countryCoordinates[item];
      if (!coords) return null;
      return {
        latLng: coords,
        name: `${item}`,
      };
    })
    .filter(Boolean);

  const regionColors = countries.reduce((acc, name) => {
    const code = countryNameToCode[name];
    if (code) acc[code] = isDarkMode ? "#290ac7" : "#3b82f6";
    return acc;
  }, {});

  return (
    <div className="w-full h-[250px] overflow-hidden ">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        regionStyle={{
          initial: {
            fill: "#D1D5DB",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0,
            strokeOpacity: 0,
          },
          hover: {
            fill: isDarkMode ? "#05eb37" : "#3b82f6",
            fillOpacity: 0.9,
            cursor: "pointer",
          },
        }}
        series={{
          regions: [
            {
              values: regionColors,
              attribute: "fill",
            },
          ],
        }}
        regionLabelStyle={{
          initial: {
            fontSize: "5px",
            fill: "#111827",
            fontWeight: 500,
          },
        }}
        markerStyle={{
          initial: {
            fill: "transparent",
            r: 0,
          },
        }}
        markers={markers}
        zoomOnScroll={false}
        zoomButtons={false}
        zoomAnimate={true}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default WorldMap;
