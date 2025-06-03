import CardContainer from 'app/components/containers/CardContainer'
import ContentHeadline from 'app/components/ContentHeadline';
import MonthlyChart from './MonthlyChart';

const MonthlyAnalytics = ({ monthlyUsers = [], totalUsers = 0 }) => {

  return (
    <CardContainer>
      <ContentHeadline
        className="border-bottom"
        type="column-start"
        title="Monthly Users Chart"
        desc="Monthly chart"
      />
      <MonthlyChart />
    </CardContainer>
  )
}

export default MonthlyAnalytics