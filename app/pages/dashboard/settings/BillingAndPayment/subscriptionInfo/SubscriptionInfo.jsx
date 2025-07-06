"use client"
import CardContainer from 'app/components/containers/CardContainer'
import { FaCheck } from 'react-icons/fa';
import SubsHeader from './SubsHeader';
import SubTitle from 'app/components/SubTitle';
import PlanInfo from './PlanInfo';

const SubscriptionInfo = ({ transactions, user }) => {
    console.log(user);

    const subscriptionEndDate = user?.subscription_timestamp
        ? (() => {
            const date = new Date(user.subscription_timestamp);
            date.setMonth(date.getMonth() + 1);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        })()
        : null;

    const subscribedSinceDate = user?.subscription_timestamp
        ? new Date(user.subscription_timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    return (
        <CardContainer>
            <div>
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
            <ul className="mt-3 space-y-2 text-[10px] lg:text-sm text-gray-600 dark:text-gray-300">
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