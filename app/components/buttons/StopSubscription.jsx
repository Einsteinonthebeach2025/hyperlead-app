"use client"
import Button from 'app/components/buttons/Button';
import React, { useState } from 'react';
import { FaRegStopCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { cancelSubscriptionUnified } from 'app/helpers/cancelSubscription';

const StopSubscription = ({ user, onSuccess, isAdmin = false }) => {
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await cancelSubscriptionUnified(user?.subscription_id, user, isAdmin);
      if (result.success) {
        const successMessage = isAdmin
          ? `Subscription cancelled successfully for ${user?.userName || user?.email}.`
          : "Subscription cancelled successfully.";
        dispatch(setError({ message: successMessage, type: "success" }));
        setCancelled(true);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(setError({ message: result.error || "Failed to cancel subscription", type: "error" }));
      }
    } catch (err) {
      dispatch(setError({ message: "Failed to cancel subscription", type: "error" }));
    }
    setLoading(false);
  };

  if (!user?.subscription_id) {
    return (
      <Button
        type="delete"
        className="pointer-events-none"
      >
        <span>{isAdmin ? "No subscription" : "Auto renewal cancelled"}</span>
        {isAdmin ? <FaRegStopCircle /> : null}
      </Button>
    );
  }

  return (
    <Button
      type={isAdmin ? "" : "delete"}
      onClick={handleCancel}
      disabled={loading || cancelled}
    >
      <span>{loading ? 'Cancelling...' : cancelled ? 'Cancelled' : 'Cancel Subscription'}</span>
      {isAdmin ? <FaRegStopCircle /> : null}
    </Button>
  );
};

export default StopSubscription;