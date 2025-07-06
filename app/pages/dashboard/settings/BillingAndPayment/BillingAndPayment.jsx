import { IoReceiptOutline, } from 'react-icons/io5';
import SubTitle from 'app/components/SubTitle';
import CardContainer from 'app/components/containers/CardContainer';
import MotionContainer from 'app/components/containers/MotionContainer';
import PaymentHistory from './paymentHistory/PaymentHistory';
import SubscriptionInfo from './subscriptionInfo/SubscriptionInfo';

const BillingAndPayment = ({ transactions = [], error, user }) => {

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <MotionContainer animation="fade-in">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PaymentHistory transactions={transactions} />
          <SubscriptionInfo transactions={transactions} user={user} />
        </div>
      </MotionContainer>
    </div>
  );
};

;



export default BillingAndPayment;