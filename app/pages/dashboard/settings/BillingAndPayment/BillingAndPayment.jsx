import { IoReceiptOutline, } from 'react-icons/io5';
import SubTitle from 'app/components/SubTitle';
import SectionHeadline from 'app/components/SectionHeadline';
import CardContainer from 'app/components/containers/CardContainer';
import MotionContainer from 'app/components/containers/MotionContainer';
import PaymentHistory from './paymentHistory/PaymentHistory';
import BillingInfo from './billingInfo/BillingInfo';
import SubscriptionInfo from './subscriptionInfo/SubscriptionInfo';

const BillingAndPayment = ({ transactions = [], error }) => {

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <MotionContainer animation="fade-in">
          <SectionHeadline
            title="Billing & Payment"
            desc="Manage your subscription and view transaction history"
          />
          <CardContainer className="text-center py-12">
            <div className="text-red-500 mb-4">
              <IoReceiptOutline size={48} className="mx-auto" />
            </div>
            <SubTitle>Error Loading Transactions</SubTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
          </CardContainer>
        </MotionContainer>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <MotionContainer animation="fade-in">
        <SectionHeadline
          title="Billing & Payment"
          desc="Manage your subscription and view transaction history"
        />
        <div className="grid grid-cols-2 gap-4">
          <PaymentHistory transactions={transactions} />
          <div className='grid grid-cols-1 gap-4'>
            <SubscriptionInfo />
            <BillingInfo transactions={transactions} />
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

;



export default BillingAndPayment;