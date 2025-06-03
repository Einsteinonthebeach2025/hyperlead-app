import CardContainer from 'app/components/containers/CardContainer'
import CountryStats from 'app/pages/dashboard/activities/leadsByRegionsStats/components/CountryStats'
import ContentHeadline from 'app/components/ContentHeadline'
import IndustryStats from 'app/pages/dashboard/activities/industryStatistics/IndustryStats'

const LeadsUsage = ({ industryStats, countryStats, totalLeads }) => {


  const industryStatsObject = industryStats.reduce((acc, { industry, count }) => {
    acc[industry] = count;
    return acc;
  }, {});


  return (
    <div className='grid grid-cols-[1.2fr_1.8fr] gap-3'>
      <CardContainer>
        <ContentHeadline
          className="border-bottom mb-2"
          type="column-start"
          title="Most Leads"
          desc="Hyperleads by country"
        />
        <CountryStats data={countryStats} total={totalLeads} color="bg-amber-500" />
      </CardContainer>
      <IndustryStats data={industryStatsObject} col="3" />
    </div>
  )
}

export default LeadsUsage