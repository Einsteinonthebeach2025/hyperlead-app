import MonthlyAnalytics from './montlyAnalytics/MonthlyAnalytics'
import WeeklyAnalytics from './weeklyAnalytics/WeeklyAnalytics'

const UserActivity = ({ monthlyUsers, totalUsers, weeklyUsers, totalLeads }) => {

  return (
    <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
      <MonthlyAnalytics monthlyUsers={monthlyUsers} />
      <WeeklyAnalytics weeklyUsers={weeklyUsers} totalUsers={totalUsers} totalLeads={totalLeads} />
    </div>
  )
}

export default UserActivity