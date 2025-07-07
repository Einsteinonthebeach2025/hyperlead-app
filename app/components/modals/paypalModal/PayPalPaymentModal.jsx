"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { setError, setToggle, selectPayPalPaymentModal } from "app/features/modalSlice";


import { SUBSCRIPTION_PLANS, EXTRA_LEADS_PLAN, SINGLE_LEAD_PLAN } from "app/lib/config/paypalConfig";
import ModalWrapper from "app/components/containers/ModalWrapper";
import PlanDetails from "./components/PlanDetails";
import TwoFactorAuthModal from "app/components/modals/TwoFactorAuthModal";
import ButtonSection from "./components/paymentButtons/ButtonSection";
import ProcessingSection from "./components/ProcessingSection";
import { updateProfile } from "app/lib/actions/profileActions";
import { useRouter } from "next/navigation";
import { createTransaction, processSubscription } from "app/lib/actions/transactionActions";

const PayPalPaymentModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isOpen, selectedPlan, data } = useSelector(selectPayPalPaymentModal);
  const planKey = selectedPlan || data?.selectedPlan;
  const [loading, setLoading] = useState(false);
  const [showAppProcessing, setShowAppProcessing] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [isChecking2FA, setIsChecking2FA] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    dispatch(
      setToggle({
        modalType: "paypalPayment",
        isOpen: false,
        data: null,
      })
    );
    setShow2FAModal(false);
    setIs2FAVerified(false);
    setTwoFARequired(false);
    setIsChecking2FA(true);
  };

  // Check if 2FA is required for this user
  useEffect(() => {
    const check2FARequirement = async () => {
      if (!user) {
        setIsChecking2FA(false);
        return;
      };
      try {
        const res = await fetch('/api/auth/check-2fa-payment', { method: 'GET' });
        const data = await res.json();
        if (data.requires2FA) {
          setTwoFARequired(true);
        }
      } catch (err) {
        console.error('Error checking 2FA requirement:', err);
      } finally {
        setIsChecking2FA(false);
      }
    };

    if (isOpen) {
      check2FARequirement();
    }
  }, [isOpen, user]);

  // Handle 2FA code submission
  const handle2FASubmit = async (code) => {
    try {
      const res = await fetch("/api/auth/verify-2fa-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: code }),
      });
      const result = await res.json();
      if (result.verified) {
        setIs2FAVerified(true);
        setShow2FAModal(false);
      } else {
        dispatch(setError({ message: result.error || "Invalid 2FA code.", type: "error" }));
      }
    } catch {
      dispatch(setError({ message: "2FA verification failed.", type: "error" }));
    }
  };

  if (!isOpen || !planKey) return null;

  // Build plan object using data from modal if present (for correct price/planId)
  let plan = selectedPlan === "EXTRA_100"
    ? EXTRA_LEADS_PLAN
    : selectedPlan === "SINGLE_LEAD"
      ? SINGLE_LEAD_PLAN
      : SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()];

  // If data contains price/planId (from PricingButton), override plan fields
  if (data?.price) plan = { ...plan, price: data.price };
  if (data?.planId) plan = { ...plan, plan_id: data.planId };

  // Handle one-time payment success
  const handlePaymentSuccess = async (orderID) => {
    setLoading(true);
    try {
      // Store temporary order data for webhook processing
      const orderData = {
        order_id: orderID,
        plan_name: selectedPlan,
        amount: plan.price,
        metadata: selectedPlan === "SINGLE_LEAD" ? { leadId: data?.leadId } : {},
      };

      // Store order data and update user profile with temp_order_id
      const response = await fetch("/api/paypal/store-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to store order data");
      }

      // Show success message - webhook will handle the rest
      if (selectedPlan === "EXTRA_100") {
        dispatch(setError({ message: "Payment successful! You will receive 100 extra leads shortly.", type: "success" }));
      } else if (selectedPlan === "SINGLE_LEAD") {
        dispatch(setError({ message: "Payment successful! Your lead will be unlocked shortly.", type: "success" }));
        dispatch(setToggle({ modalType: "hyperSearch", isOpen: false }));
      } else {
        dispatch(setError({
          message: `Payment successful! You will receive ${plan.leads} leads shortly.`,
          type: "success",
        }));
      }
      handleClose();
    } catch (error) {
      dispatch(setError({ message: error.message, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  // Handle subscription success
  const handleSubscriptionSuccess = async (subscriptionID) => {
    setLoading(true);
    try {
      await updateProfile(user.id, { subscription_id: subscriptionID })
      const verifyResponse = await fetch("/api/paypal-subscription/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionID,
          planName: selectedPlan,
        }),
      });
      const verifyData = await verifyResponse.json();
      if (!verifyData.success) throw new Error(verifyData.error || "Subscription verification failed");
      const { payerInfo, amount } = verifyData;
      const transactionResult = await createTransaction(
        user.id,
        subscriptionID,
        selectedPlan,
        amount || plan.price,
        { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
        payerInfo,
      );
      if (!transactionResult.success) throw new Error(transactionResult.error);
      const subscriptionResult = await processSubscription(
        user.id,
        user.email,
        selectedPlan,
        plan.leads
      );
      if (!subscriptionResult.success) throw new Error(subscriptionResult.error);
      dispatch(setError({
        message: `Subscribed to ${selectedPlan} and received ${plan.leads} leads!`,
        type: "success",
      }));
      handleClose();
    } catch (error) {
      console.error("Subscription error:", error);
      dispatch(setError({ message: error.message, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionError = (error) => {
    console.error("PayPal subscription error:", error);
    dispatch(setError({ message: "Subscription failed.", type: "error" }));
  };

  const handlePaymentError = (error) => {
    console.error("PayPal error:", error);
    dispatch(setError({ message: "Payment failed.", type: "error" }));
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={handleClose}
      title={`Subscribe to ${selectedPlan} Plan`}
    >
      <div className="space-y-5 w-full ">
        <PlanDetails plan={plan} />
        <ButtonSection
          plan={plan}
          isChecking2FA={isChecking2FA}
          twoFARequired={twoFARequired}
          is2FAVerified={is2FAVerified}
          setShow2FAModal={setShow2FAModal}
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentError={handlePaymentError}
          setShowAppProcessing={setShowAppProcessing}
          handleSubscriptionSuccess={handleSubscriptionSuccess}
          handleSubscriptionError={handleSubscriptionError}
        />
        <ProcessingSection loading={loading} />
      </div>
      <TwoFactorAuthModal
        isOpen={show2FAModal}
        onClose={() => setShow2FAModal(false)}
        onSubmit={handle2FASubmit}
        loading={loading}
        type="payment"
      />
    </ModalWrapper>
  );
};


export default PayPalPaymentModal;
