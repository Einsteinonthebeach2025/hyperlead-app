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
                description: `${desc} - Transaction`
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          //create local order
          // const localOrder = {
          //   id: data.orderID,
          //   plan: plan,
          //   amount: plan.price,
          //   currency: "USD",
          //   status: "draft",
          // }
          // //save local order to supabase
          // const { data: localOrderData, error: localOrderError } = await supabase.from("local_orders").insert(localOrder);
          // if (localOrderError) {
          //   console.error("Error saving local order:", localOrderError);
          // }

          const order = await actions.order.capture();
          setShowAppProcessing(true);
          handlePaymentSuccess(order.id);
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