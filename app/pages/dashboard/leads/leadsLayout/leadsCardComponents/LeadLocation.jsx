import FlexBox from "app/components/containers/FlexBox";
import { CountryFlags } from "app/components/CountryFlags";
import SubTitle from "app/components/SubTitle";

const LeadLocation = ({ lead = {} }) => {
  const { country = "", city = "", state = "" } = lead;
  return (
    <FlexBox type="column-center" className="pl-4">
      <FlexBox type="row" className="gap-1">
        {country && <CountryFlags countryName={country} />}
        {country && <SubTitle>{country}</SubTitle>}
      </FlexBox>
      <FlexBox type="column-center">
        {city && <h1 className="text-[13px] font-medium">{city}</h1>}
        {state && (
          <h1 className="text-[13px] font-medium text-blue-800">{state}</h1>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default LeadLocation;
