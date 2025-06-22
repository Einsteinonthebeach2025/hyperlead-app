"use client"
import CardContainer from 'app/components/containers/CardContainer'
import FlexBox from 'app/components/containers/FlexBox';
import IconContainer from 'app/components/containers/IconContainer';
import Paragraph from 'app/components/Paragraph';
import SubTitle from 'app/components/SubTitle';
import { IoCardOutline, IoReceiptOutline } from 'react-icons/io5'

const BillingInfo = () => {
    return (
        <CardContainer className="space-y-4">
            <div className="flex items-center gap-3">
                <IconContainer size="sm">
                    <IoCardOutline />
                </IconContainer>
                <SubTitle>Billing Information</SubTitle>
            </div>

            <div className="grid gap-4">
                <BillingInfoCard
                    title="Payment Methods"
                    description="Manage your payment methods and billing preferences"
                    icon={<IoCardOutline />}
                    actionText="Manage Payment Methods"
                    onClick={() => {/* TODO: Implement payment method management */ }}
                />

                <BillingInfoCard
                    title="Billing Address"
                    description="Update your billing address for invoices"
                    icon={<IoReceiptOutline />}
                    actionText="Update Address"
                    onClick={() => {/* TODO: Implement billing address update */ }}
                />
            </div>
        </CardContainer>
    )
}

const BillingInfoCard = ({ title, description, icon, actionText, onClick }) => {
    return (
        <div className="p-4 primary-border rounded-lg shadow-sm bg-neutral-50/50 dark:bg-[#344c63]/50">
            <FlexBox type="row-start" className="gap-3">
                <IconContainer size="sm">{icon}</IconContainer>
                <div className="flex-1">
                    <SubTitle>{title}</SubTitle>
                    <p className="text-neutral-400 text-xs h-8">{description}</p>
                    <button
                        onClick={onClick}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        {actionText} →
                    </button>
                </div>
            </FlexBox>
        </div>
    );
};

export default BillingInfo