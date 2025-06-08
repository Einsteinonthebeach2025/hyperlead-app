import FlexBox from "app/components/containers/FlexBox";
import { CountryFlags } from "app/components/CountryFlags";
import Dot from "app/components/Dot";
import SubTitle from "app/components/SubTitle";

const LeadLocation = ({ lead = {} }) => {
  const { country = "", city = "", state = "" } = lead;
  return (
    <FlexBox type="column-center" className="pl-3">
      <FlexBox type="row" className="gap-1">
        {country && <CountryFlags countryName={country} />}
        {country && <SubTitle>{country}</SubTitle>}
      </FlexBox>
      <FlexBox type="row-start" className="text-blue-800 space-x-1 items-center font-medium text-[10px]">
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
