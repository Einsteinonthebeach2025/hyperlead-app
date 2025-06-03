import CardContainer from 'app/components/containers/CardContainer';
import ContentHeadline from 'app/components/ContentHeadline';
import WeeksChart from './WeeksChart';
import MotionCount from 'app/components/MotionCount';
import FlexBox from 'app/components/containers/FlexBox';

const WeeklyAnalytics = ({ weeklyUsers, totalUsers, totalLeads }) => {
  const mockWeeklyUsers = {
    current: 78,
    last: 35,
  };

  const { current, last } =
    weeklyUsers?.current && weeklyUsers?.last ? weeklyUsers : mockWeeklyUsers;

  return (
    <div className='grid grid-cols-1 gap-3'>
      <CardContainer>
        <ContentHeadline
          className="border-bottom"
          type="column-start"
          title="Weekly Users Chart"
          desc="Based on the number of users created this week"
        />
        <WeeksChart current={current} last={last} />
      </CardContainer>
      <FlexBox type="row" className="gap-3 *:w-full">
        <CardContainer>
          <MotionCount data={totalUsers} title="Hyperlead Users" color="green" />
        </CardContainer>
        <CardContainer>
          <MotionCount data={totalLeads} title="Hyperleads" color="gold" />
        </CardContainer>
      </FlexBox>
    </div>
  );
};

export default WeeklyAnalytics;
