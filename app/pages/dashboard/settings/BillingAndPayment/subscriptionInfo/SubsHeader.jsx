import Button from 'app/components/buttons/Button';
import SubTitle from 'app/components/SubTitle';
import { FaExclamationTriangle } from 'react-icons/fa';

const SubsHeader = ({ subscriptionEndDate }) => {
    return (
        <div>
            <SubTitle>My subscription</SubTitle>
            <div className="mt-4 bg-blue-900/20 dark:bg-slate-800/50 p-3 rounded-lg flex items-center justify-between text-sm">
                <div className="flex items-center">
                    <FaExclamationTriangle className="text-red-500 mr-3" size={24} />
                    <div className='flex flex-col'>
                        <p className='text-gray-800 dark:text-gray-300'>Your subscription ends on {subscriptionEndDate}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Any new projects you create won't be covered by the license.</p>
                    </div>
                </div>
                <Button
                    className="bg-green-500 hover:bg-green-600 text-white !text-xs !px-3 !py-2 rounded-full"
                    onClick={() => { /* TODO */ }}
                >
                    Turn Renewal On
                </Button>
            </div>
        </div>
    )
}

export default SubsHeader;