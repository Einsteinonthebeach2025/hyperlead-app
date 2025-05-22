import CardContainer from 'app/components/containers/CardContainer'
import ContentHeadline from 'app/components/ContentHeadline';
import MonthlyChart from './MonthlyChart';

const MonthlyAnalytics = ({ monthlyUsers = [], totalUsers = 0 }) => {

  return (
    <CardContainer>
      <ContentHeadline
        className="pb-2 border-b border-neutral-200"
        type="column-start"
        title="Monthly Users Chart"
        desc="Monthly chart"
      />
      <MonthlyChart />
    </CardContainer>
  )
}

export default MonthlyAnalytics