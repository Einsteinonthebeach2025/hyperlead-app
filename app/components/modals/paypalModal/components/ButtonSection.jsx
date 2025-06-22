import Button from 'app/components/buttons/Button'
import React from 'react'
import { FaShieldAlt } from 'react-icons/fa'
import PaymentButton from './PaymentButton'
import Spinner from 'app/components/Spinner';

const ButtonSection = ({ isChecking2FA, twoFARequired, is2FAVerified, setShow2FAModal, plan, handlePaymentSuccess, handlePaymentError, setShowAppProcessing }) => {

  if (isChecking2FA) {
    return (
      <div className='w-full center'>
        <Spinner />
      </div>
    )
  }

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
        <PaymentButton
          plan={plan}
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentError={handlePaymentError}
          setShowAppProcessing={setShowAppProcessing}
        />
      )}
    </div>
  )
}

export default ButtonSection