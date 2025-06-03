import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import SectionHeadline from 'app/components/SectionHeadline';
import List from './List';

const Notifications = ({ data, message, desc }) => {

  if (data?.length === 0 || !data) {
    return (
      <div className='h-screen center'>
        <SectionHeadline
          title={message || "No notifications found"}
          desc={desc || "You have no notifications"}
        />
      </div>
    )
  }

  return (
    <DashboardPageWrapper title="Notifications">
      <List data={data} />
    </DashboardPageWrapper>
  )
}

export default Notifications