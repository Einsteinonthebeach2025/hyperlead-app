"use client"
import Button from 'app/components/buttons/Button';
import React, { useState } from 'react';
import { FaRegStopCircle } from "react-icons/fa";
import { notifySubscriptionCancel } from 'app/lib/actions/notificationActions';
import { sendSubscriptionCancelEmail } from 'app/lib/actions/emailActions';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { cancelSubscription } from 'app/lib/actions/transactionActions';

const StopSubscription = ({ user, onSuccess, isAdmin = false }) => {
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/paypal/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: user?.subscription_id }),
      });
      const data = await res.json();
      if (data.success) {
        await notifySubscriptionCancel(user.id);
        await sendSubscriptionCancelEmail({
          userName: user?.userName,
          email: user.email,
          cancelled_at: new Date()
        });
        await cancelSubscription(user.id, user?.subscription_id, new Date());
        const successMessage = isAdmin
          ? `Subscription cancelled successfully for ${user?.userName || user?.email}.`
          : "Subscription cancelled successfully.";

        dispatch(setError({ message: successMessage, type: "success" }));
        setCancelled(true);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(setError("Failed to cancel subscription"));
      }
    } catch (err) {
      dispatch(setError("Failed to cancel subscription"));
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