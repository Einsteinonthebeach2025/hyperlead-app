import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import SectionHeadline from 'app/components/SectionHeadline';
import List from './List';

const Notifications = ({ data, message, desc }) => {

  if (data?.length === 0) {
    return (
      <SectionHeadline
        title={message || "No notifications found"}
        desc={desc || "You have no notifications"}
      />
    )
  }

  return (
    <DashboardPageWrapper title="Notifications">
      <List data={data} />
    </DashboardPageWrapper>
  )
}

export default Notifications