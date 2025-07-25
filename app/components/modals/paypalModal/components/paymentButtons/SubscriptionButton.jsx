"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { setError } from "app/features/modalSlice";
import { useEffect } from "react";

const SubscriptionButton = ({ plan, planType, handleSubscriptionSuccess, handleSubscriptionError, setShowAppProcessing }) => {
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
          handleSubscriptionSuccess(data.subscriptionID, planType);
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
