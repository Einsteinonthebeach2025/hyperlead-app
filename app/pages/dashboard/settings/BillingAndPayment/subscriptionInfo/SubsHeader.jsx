import IconContainer from 'app/components/containers/IconContainer';
import SubTitle from 'app/components/SubTitle';
import { FaExclamationTriangle } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';

const SubsHeader = ({ subscriptionEndDate }) => {
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
                            <div className='flex flex-col'>
                                <p className='text-gray-800 dark:text-gray-300'>Your subscription ends on {subscriptionEndDate}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Any new projects you create won't be covered by the license.</p>
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