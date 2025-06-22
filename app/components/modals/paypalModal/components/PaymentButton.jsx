import { PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';

const PaymentButton = ({ plan, handlePaymentSuccess, handlePaymentError, setShowAppProcessing }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center max-h-[20vh]">
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay"
        }}
        fundingSource={undefined} // This allows both PayPal and card payments
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: plan.price,
                  currency_code: "USD",
                },
                description: `${plan.name} Plan - ${plan.leads} leads per month`,
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();

          // Show your app's spinner/modal
          setShowAppProcessing(true);

          // Start backend processing, but don't await it here
          handlePaymentSuccess(order.id);

          // Return immediately so PayPal closes its modal
          return;
        }}
        onError={handlePaymentError}
        onCancel={() => {
          dispatch(
            setError({
              message: "Payment cancelled",
              type: "error",
            })
          );
        }}
      />
    </div>
  )
}

export default PaymentButton