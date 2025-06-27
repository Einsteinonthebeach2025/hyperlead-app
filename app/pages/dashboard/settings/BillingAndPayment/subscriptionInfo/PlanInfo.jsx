import Button from 'app/components/buttons/Button'
import SubTitle from 'app/components/SubTitle'

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
                        <div className="flex gap-2">
                            <Button
                                className="bg-green-500 hover:bg-green-600 text-white !text-xs !px-3 !py-2 rounded-full"
                                onClick={() => { /* TODO */ }}
                            >
                                Change Plan
                            </Button>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white !text-xs !px-3 !py-2 rounded-full"
                                onClick={() => { /* TODO */ }}
                            >
                                Cancel Subscription
                            </Button>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 my-4"></div>
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