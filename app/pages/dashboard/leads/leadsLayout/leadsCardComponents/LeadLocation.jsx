import FlexBox from "app/components/containers/FlexBox";
import { CountryFlags } from "app/components/CountryFlags";
import Dot from "app/components/Dot";

const LeadLocation = ({ lead = {} }) => {
  const { country = "", city = "", state = "" } = lead;
  return (
    <FlexBox type="column-start" className="items-center ">
      {country && <CountryFlags countryName={country} />}
      {country && <h1 className="dark:text-neutral-100  text-xs font-bold">{country}</h1>}
      <FlexBox type="row-start" className="text-blue-800 dark:text-blue-600 space-x-1 items-center font-medium text-[10px]">
        {city && <h1>{city}</h1>}
        {city && <Dot />}
        {state && (
          <h1>{state}</h1>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default LeadLocation;
