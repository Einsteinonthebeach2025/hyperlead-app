"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { selectUser, setUser } from "app/features/userSlice";
import { setError, setToggle, selectPayPalPaymentModal } from "app/features/modalSlice";
import { createTransaction, processSubscription } from "app/lib/actions/transactionActions";
import { SUBSCRIPTION_PLANS } from "app/lib/config/paypalConfig";
import ModalWrapper from "app/components/containers/ModalWrapper";
import SubTitle from "app/components/SubTitle";
import Paragraph from "app/components/Paragraph";
import PlanDetails from "./PlanDetails";
import Spinner from "app/components/Spinner";

const PayPalPaymentModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isOpen, selectedPlan } = useSelector(selectPayPalPaymentModal);
  const [loading, setLoading] = useState(false);
  const [showAppProcessing, setShowAppProcessing] = useState(false);

  const handleClose = () => {
    dispatch(
      setToggle({
        modalType: "paypalPayment",
        isOpen: false,
        data: null,
      })
    );
  };

  if (!isOpen || !selectedPlan) return null;

  const plan = SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()];
  if (!plan) return null;

  const handlePaymentSuccess = async (orderID) => {
    setLoading(true);
    try {
      const verifyResponse = await fetch("/api/paypal/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID,
          planName: selectedPlan,
        }),
      });
      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || "Payment verification failed");
      }
      // Create transaction record
      const transactionResult = await createTransaction(
        user.id,
        orderID,
        selectedPlan,
        plan.price
      );
      if (!transactionResult.success) {
        throw new Error(transactionResult.error || "Failed to create transaction");
      }
      // Process subscription and assign leads
      const subscriptionResult = await processSubscription(
        user.id,
        user.email,
        selectedPlan,
        plan.leads
      );
      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.error || "Failed to process subscription");
      }
      // Update user state
      dispatch(
        setUser({
          ...user,
          profile: {
            ...user.profile,
            subscription: selectedPlan,
            subscription_timestamp: new Date().toISOString(),
            monthly_leads: plan.leads,
            leads_received_this_month: (user.profile.leads_received_this_month || 0) + plan.leads,
            last_lead_reset_date: new Date().toISOString(),
          },
        })
      );
      dispatch(
        setError({
          message: `Successfully subscribed to ${selectedPlan} plan and received ${plan.leads} leads!`,
          type: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.error("Payment processing error:", error);
      dispatch(
        setError({
          message: error.message || "Payment processing failed",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error("PayPal payment error:", error);
    dispatch(
      setError({
        message: "Payment failed. Please try again.",
        type: "error",
      })
    );
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={handleClose}
      title={`Subscribe to ${selectedPlan} Plan`}
    >
      <div className="space-y-6 p-6">
        <PlanDetails plan={plan} />
        <div className="space-y-4">
          <SubTitle>Complete Payment</SubTitle>
          <Paragraph>
            Choose your preferred payment method below. You'll receive {plan.leads} leads immediately after payment.
          </Paragraph>
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
        </div>

        {loading && (
          <div className="text-center py-4">
            <Spinner />
            <Paragraph className="mt-2">Processing your payment...</Paragraph>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default PayPalPaymentModal; 