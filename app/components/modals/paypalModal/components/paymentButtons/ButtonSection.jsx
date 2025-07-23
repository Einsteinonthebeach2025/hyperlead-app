import { FaShieldAlt } from 'react-icons/fa'
import Button from 'app/components/buttons/Button'
import Spinner from 'app/components/Spinner';
import SubscriptionButton from './SubscriptionButton';
import PayPalOneTimePaymentWrapper from 'app/lib/store/PayPalOneTimePaymentWrapper';
import PaypalSubscriptionProvider from 'app/lib/store/PaypalSubscriptionProvider';
import PaymentButton from './PaymentButton';

const ButtonSection = ({
  isChecking2FA, twoFARequired, is2FAVerified, setShow2FAModal,
  plan, handlePaymentSuccess, handlePaymentError, setShowAppProcessing,
  handleSubscriptionSuccess, handleSubscriptionError
}) => {

  if (isChecking2FA) {
    return (
      <div className='w-full center'>
        <Spinner />
      </div>
    )
  }

  const isSubscription = !!plan.plan_id;
  const planType = plan?.planType || plan?.name || plan?.title || plan?.planKey || plan?.id || "";

  return (
    <div>
      {twoFARequired && !is2FAVerified && (
        <Button
          text="Verify 2FA to Continue"
          onClick={() => setShow2FAModal(true)}
        >
          <FaShieldAlt />
          <span>Verify 2FA to Continue</span>
        </Button>
      )}

      {(!twoFARequired || is2FAVerified) && (
        isSubscription ? (
          <PaypalSubscriptionProvider>
            <SubscriptionButton
              plan={plan}
              planType={planType}
              handleSubscriptionSuccess={handleSubscriptionSuccess}
              handleSubscriptionError={handleSubscriptionError}
              setShowAppProcessing={setShowAppProcessing}
            />
          </PaypalSubscriptionProvider>
        ) : (
          <PayPalOneTimePaymentWrapper>
            <PaymentButton
              plan={plan}
              handlePaymentSuccess={handlePaymentSuccess}
              handlePaymentError={handlePaymentError}
              setShowAppProcessing={setShowAppProcessing}
            />
          </PayPalOneTimePaymentWrapper>
        )
      )}
    </div>
  )
}

export default ButtonSection