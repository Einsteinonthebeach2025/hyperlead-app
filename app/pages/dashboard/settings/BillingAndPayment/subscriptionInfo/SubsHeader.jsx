import IconContainer from 'app/components/containers/IconContainer';
import SubTitle from 'app/components/SubTitle';
import { FaExclamationTriangle } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';

const SubsHeader = ({ subscriptionEndDate, user }) => {

  return (
    <>
      {subscriptionEndDate && (
        <div>
          <div className="flex items-center gap-3">
            <IconContainer size="sm">
              <IoReceiptOutline />
            </IconContainer>
            <SubTitle>Subscription Info</SubTitle>
          </div>
          <div className="mt-4 bg-blue-900/20 dark:bg-slate-800/50 p-3 rounded-lg flex items-center text-sm">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" size={24} />
              <div className='flex flex-col text-xs dark:text-gray-400 font-medium'>
                {user?.subscription_status === "cancelled" ? <p>You have cancelled your subscription. Expiration date on {subscriptionEndDate}</p> : <p>
                  Next recurring payment will {subscriptionEndDate}.
                </p>}
                <p className='font-light'>
                  Please note: Once your subscription expires, you will lose access to your leads and related features until you renew your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!subscriptionEndDate && (
        <div>
          <SubTitle>No Subscription found</SubTitle>
        </div>
      )}
    </>
  )
}

export default SubsHeader;