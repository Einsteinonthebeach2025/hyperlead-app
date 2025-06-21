"use client"
import CardContainer from 'app/components/containers/CardContainer'
import { selectUser } from 'app/features/userSlice'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa';
import SubsHeader from './SubsHeader';
import SubTitle from 'app/components/SubTitle';
import PlanInfo from './PlanInfo';

const SubscriptionInfo = () => {
    const user = useSelector(selectUser)

    const subscriptionEndDate = user?.profile?.subscription_timestamp
        ? (() => {
            const date = new Date(user.profile.subscription_timestamp);
            date.setMonth(date.getMonth() + 1);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        })()
        : 'August 19, 2025';

    const subscribedSinceDate = user?.profile?.subscription_timestamp
        ? new Date(user.profile.subscription_timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'August 20, 2024';

    return (
        <CardContainer>
            <div className="p-6">
                <SubsHeader subscriptionEndDate={subscriptionEndDate} />
                <PlanInfo user={user} subscribedSinceDate={subscribedSinceDate} />
                <FooterInfo />
            </div>
        </CardContainer>
    )
}

const FooterInfo = () => {
    return (
        <div className='mt-5'>
            <SubTitle>Upgrade to get more leads</SubTitle>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Unlimited access to all catalogs</span>
                </li>
                <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Pro license</span>
                </li>
                <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Covers everything from personal to commercial use</span>
                </li>
            </ul>
        </div>
    )
}

export default SubscriptionInfo