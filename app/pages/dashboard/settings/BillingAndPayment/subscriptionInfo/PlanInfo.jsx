import SubTitle from 'app/components/SubTitle'
import StopSubscription from 'app/components/buttons/StopSubscription';

const PlanInfo = ({ user, subscribedSinceDate }) => {

  return (
    <>
      {subscribedSinceDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Current Plan</h3>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="font-bold text-xl text-gray-800 dark:text-white">{user?.subscription?.plan || 'PRO'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Subscribed since {subscribedSinceDate}</p>
            </div>
            <StopSubscription user={user} isAdmin={false} />
          </div>
        </div>
      )}
      {!subscribedSinceDate && (
        <div>
          <SubTitle>No Subscription data found</SubTitle>
        </div>
      )}
    </>
  )
}


export default PlanInfo