"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { setError } from "app/features/modalSlice";

const SubscriptionButton = ({ plan, handleSubscriptionSuccess, handleSubscriptionError, setShowAppProcessing }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center max-h-[20vh]">
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "subscribe",
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: plan.plan_id, // From SUBSCRIPTION_PLANS
          });
        }}
        onApprove={(data, actions) => {
          setShowAppProcessing(true);
          handleSubscriptionSuccess(data.subscriptionID);
        }}
        onError={(err) => {
          dispatch(setError({ message: "Subscription error", type: "error" }));
          handleSubscriptionError(err);
        }}
        onCancel={() => {
          dispatch(setError({ message: "Subscription cancelled", type: "error" }));
        }}
      />
    </div>
  );
};

export default SubscriptionButton;
