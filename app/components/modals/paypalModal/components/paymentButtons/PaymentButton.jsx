import { PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';

const PaymentButton = ({ plan, handlePaymentSuccess, handlePaymentError, setShowAppProcessing }) => {
  const desc = plan.name === "Extra 100 Leads" ? "Additional 100 Leads Purchase" : "Special Lead Purchase";
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center max-h-[20vh]">
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
          fundingIcons: true,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: plan.price,
                  currency_code: "USD",
                },
                description: `${desc} - Transaction`,
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          setShowAppProcessing(true);
          handlePaymentSuccess(order.id);
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
  );
};

export default PaymentButton;
