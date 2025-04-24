"use client";
import Button from "app/components/buttons/Button";
import CardContainer from "app/components/containers/CardContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import { setError } from "app/features/modalSlice";
import { selectUser, setUser } from "app/features/userSlice";
import {
  assignLeadsToUser,
  simulateSubscriptionExpiration,
} from "app/lib/actions/leadActions";
import { updateProfile } from "app/lib/actions/profileActions";
import supabase from "app/lib/config/supabaseClient";
import { useState } from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Card = () => {
  const user = useSelector(selectUser);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch();

  const handleSubscription = async (plan) => {
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
      const monthlyLeads = plan === "basic" ? 20 : 40;
      const {
        success,
        error: leadError,
        assignedLeadsCount,
      } = await assignLeadsToUser(
        session.user.id,
        user.email,
        user.profile.preferences,
        monthlyLeads,
        true // This is a new subscription
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
      };
      const { data, error } = await updateProfile(session.user.id, updates);
      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }
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
  };

  const handleTestExpiration = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const result = await simulateSubscriptionExpiration(session.user.id);
      if (result.error) {
        dispatch(setError({ message: result.error }));
      } else {
        dispatch(
          setError({
            message:
              "Subscription expired successfully! You can now test renewal.",
            type: "success",
          })
        );
      }
    } catch (error) {
      dispatch(setError({ message: error.message }));
    }
  };

  return (
    <>
      <MotionContainer
        animation="fade-in"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <MotionChildren animation="fade-in">
          <CardContainer className=" space-y-3">
            <Title>Basic Plan</Title>
            <Paragraph>2 leads per month</Paragraph>
            <Button
              onClick={() => handleSubscription("basic")}
              loading={loadingPlan === "basic"}
            >
              <span>Subscribe to Basic</span>
              <IoCaretForwardOutline />
            </Button>
          </CardContainer>
        </MotionChildren>
        <MotionChildren animation="fade-in">
          <CardContainer className=" space-y-3">
            <Title>Pro Plan</Title>
            <Paragraph>4 leads per month</Paragraph>
            <Button
              onClick={() => handleSubscription("pro")}
              loading={loadingPlan === "pro"}
            >
              <span>Subscribe to Pro</span>
              <IoCaretForwardOutline />
            </Button>
          </CardContainer>
        </MotionChildren>
      </MotionContainer>
      <Button onClick={handleTestExpiration}>
        Test Subscription Expiration
      </Button>
    </>
  );
};

export default Card;
