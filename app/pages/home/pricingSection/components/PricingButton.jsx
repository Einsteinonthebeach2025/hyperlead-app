"use client";
import Button from "app/components/buttons/Button";
import { setError } from "app/features/modalSlice";
import { selectUser, setUser } from "app/features/userSlice";
import { assignLeadsToUser } from "app/lib/actions/leadActions";
import { updateProfile } from "app/lib/actions/profileActions";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { notifyUserOnSubscription } from "app/lib/actions/notificationActions";
import supabase from "app/lib/config/supabaseClient";

const PricingButton = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSubscription = async (plan) => {
    if (!user) {
      dispatch(
        setError({
          message: "Please login to subscribe to a plan",
          type: "error",
        })
      );
      return;
    }
    if (
      user?.profile?.subscription === "Starter" ||
      user?.profile?.subscription === "PRO"
    ) {
      dispatch(
        setError({
          message: "You are already subscribed to this plan",
          type: "error",
        })
      );
      return;
    }
    setLoadingPlan(plan);
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (!user?.profile?.preferences?.length) {
        dispatch(
          setError({
            message: "Please set your industry preferences before subscribing",
            type: "error",
            link: "/preferences",
            title: "Go to preferences",
          })
        );
        return;
      }
      const monthlyLeads = plan.toLowerCase() === "starter" ? 20 : 40;
      const {
        success,
        error: leadError,
        assignedLeadsCount,
      } = await assignLeadsToUser(
        session.user.id,
        user.email,
        user.profile.preferences,
        monthlyLeads,
        true
      );
      if (!success) {
        throw new Error(leadError || "Failed to assign leads");
      }
      const currentTotal = user.profile.total_leads_received || 0;
      const currentMonthLeads = user.profile.leads_received_this_month || 0;
      const updates = {
        subscription: plan,
        subscription_timestamp: new Date().toISOString(),
        monthly_leads: monthlyLeads,
        leads_received_this_month: currentMonthLeads + assignedLeadsCount,
        total_leads_received: currentTotal + assignedLeadsCount,
        last_lead_reset_date: new Date().toISOString(),
        last_notification_timestamp: null,
      };
      const { data, error } = await updateProfile(session.user.id, updates);
      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }
      await notifyUserOnSubscription(assignedLeadsCount);
      dispatch(
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...updates,
          },
        })
      );
      dispatch(
        setError({
          message: `Successfully subscribed to ${plan} plan and received ${assignedLeadsCount} leads!`,
          type: "success",
        })
      );
    } catch (error) {
      console.error("Error in handleSubscription:", error);
      dispatch(
        setError({
          message: error.message || "Failed to update subscription",
        })
      );
    } finally {
      setLoadingPlan(null);
    }
    console.log("clicked");
  };

  return (
    <Button
      loading={loadingPlan === item.title}
      onClick={() => handleSubscription(item.title)}
    >
      <IoMdHome size={20} />
      <h1>Activate {item.title}</h1>
    </Button>
  );
};

export default PricingButton;
