import FlexBox from "app/components/containers/FlexBox";
import Dot from "app/components/Dot";
import { CountryFlags } from "app/components/CountryFlags";
import { truncateString } from "app/helpers/utils";

const LeadLocation = ({ lead = {}, colorTheme }) => {
  const { country = "", city = "", state = "" } = lead;

  const colorClass = {
    violet: 'text-violet-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
  }[colorTheme] || 'text-rose-500';

  return (
    <FlexBox type="column-start" className="items-center ">
      <FlexBox type="row-start" className="items-center">
        <h1 className="text-xs font-bold dark:text-white">
          {truncateString(lead?.company_title, 60)}
        </h1>
      </FlexBox>
      <FlexBox type="row-start" className="items-center gap-1">
        {country &&
          <div className="p-1 w-7 h-7 center bg-blue-400/40 rounded-md">
            <CountryFlags style={{ width: '18px', height: '18px' }} countryName={country} /></div>
        }
        <FlexBox type="column-start" className="items-center">
          {city && <h1 className="dark:text-neutral-100  text-xs font-bold">{city}</h1>}
          <FlexBox type="row-start" className={`${colorClass} space-x-1 items-center font-medium text-[10px]`}>
            {state && <h1>{state}</h1>}
            {city && <Dot />}
            {country && (
              <h1>{country}</h1>
            )}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default LeadLocation;
