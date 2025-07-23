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
import { createTransaction } from "app/lib/actions/transactionActions";
import { addExtraLeads, unlockingLeads } from "app/lib/actions/leadActions";
import { notifyExtraLeadsPurchase, notifySingleLeadUnlock } from "app/lib/actions/notificationActions";

const PayPalPaymentModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isOpen, selectedPlan, data } = useSelector(selectPayPalPaymentModal);

  let subscriptionType = "MONTHLY";
  if (data?.subscriptionType) {
    subscriptionType = data.subscriptionType;
  } else if (data?.pricingMode === "annual") {
    subscriptionType = "ANNUAL";
  } else if (data?.pricingMode === "monthly") {
    subscriptionType = "MONTHLY";
  }

  const planKey = selectedPlan || data?.selectedPlan;
  const [loading, setLoading] = useState(false);
  const [showAppProcessing, setShowAppProcessing] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [isChecking2FA, setIsChecking2FA] = useState(true);

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

  // Ensure annual plan_id is set for annual subscriptions
  if ((subscriptionType === "ANNUAL" || data?.pricingMode === "annual") && !plan.plan_id && plan.annual_plan_id) {
    plan = { ...plan, plan_id: plan.annual_plan_id };
  }

  // Handle one-time payment success
  const handlePaymentSuccess = async (orderID) => {
    setShowAppProcessing(true); // Show spinner only after payment starts
    setLoading(true);
    try {
      const orderData = {
        orderID: orderID,
        planName: selectedPlan,
        amount: plan.price,
        metadata: selectedPlan === "SINGLE_LEAD" ? { leadId: data?.leadId } : {},
      };
      // Verify payment with backend
      const response = await fetch("/api/paypal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const verifyData = await response.json();
      if (!response.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Failed to verify payment");
      }
      const captureId = verifyData.captureId;
      // Handle EXTRA_100 plan
      if (selectedPlan === "EXTRA_100") {
        const extraLeadsResult = await addExtraLeads(user.id);
        if (!extraLeadsResult.success) throw new Error(extraLeadsResult.error);
        const transactionResult = await createTransaction(
          user.id,
          orderID,
          selectedPlan,
          plan.price,
          { brand: "PayPal", last4: "N/A", maskedCard: "PayPal" },
          verifyData.payerInfo,
          captureId,
          undefined,
          { subscription_type: subscriptionType }
        );
        if (!transactionResult.success) throw new Error(transactionResult.error);
        await notifyExtraLeadsPurchase(user.id, user.profile?.userName || user.email, 100);
        dispatch(setError({ message: "Payment successful! You will receive 100 extra leads shortly.", type: "success" }));
        handleClose();
        return;
      }
      // Handle SINGLE_LEAD plan
      if (selectedPlan === "SINGLE_LEAD") {
        const leadId = data?.leadId;
        if (!leadId) throw new Error("No leadId provided for single lead unlock");
        const unlockResult = await unlockingLeads(
          leadId,
          user.id,
          user.email,
          user.profile?.userName || user.email,
          subscriptionType
        );
        if (!unlockResult.success) throw new Error(unlockResult.error);
        const transactionResult = await createTransaction(
          user.id,
          orderID,
          selectedPlan,
          plan.price,
          { brand: "PayPal", last4: "N/A", maskedCard: "PayPal" },
          verifyData.payerInfo,
          captureId,
          undefined,
          { subscription_type: subscriptionType }
        );
        if (!transactionResult.success) throw new Error(transactionResult.error);
        await notifySingleLeadUnlock(user.id, user.profile?.userName || user.email, leadId);
        dispatch(setError({ message: "Payment successful! Your lead will be unlocked shortly.", type: "success" }));
        dispatch(setToggle({ modalType: "hyperSearch", isOpen: false }));
        handleClose();
        return;
      }
      // Default: show success for other plans
      dispatch(setError({
        message: `Payment successful! You will receive ${plan.leads} leads shortly.`,
        type: "success",
      }));
      handleClose();
    } catch (error) {
      dispatch(setError({ message: error.message, type: "error" }));
    } finally {
      setLoading(false);
      setShowAppProcessing(false);
    }
  };

  // Handle subscription success
  const handleSubscriptionSuccess = async (subscriptionID, planType) => {
    setLoading(true);
    try {
      console.log("[PayPal] handleSubscriptionSuccess: updating user profile with subscription_id", subscriptionID);
      console.log("[PayPal] subscription type", subscriptionType);
      await updateProfile(user.id, {
        subscription_id: subscriptionID,
        subscription: planType,
        subscription_type: subscriptionType,
      });
      console.log("[PayPal] handleSubscriptionSuccess: subscription_id updated, waiting for webhook to assign leads");
      dispatch(setError({
        message: "Subscription successful! Your leads will be available shortly after payment confirmation.",
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
        <ProcessingSection loading={showAppProcessing} />
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
