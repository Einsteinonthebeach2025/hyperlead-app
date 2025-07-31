"use client";
import Button from "app/components/buttons/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { subscribeToNewsletter, checkSubscriptionStatus } from "app/lib/actions/emailSubscriptionActions";
import { setError } from "app/features/modalSlice";
import { useDispatch } from "react-redux";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Check subscription status on component mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (user?.email) {
          const { isSubscribed } = await checkSubscriptionStatus(user.email, user.id);
          setIsSubscribed(isSubscribed);
        }
      } catch (error) {
        console.warn("Error checking subscription status:", error);
        // Don't set error state, just continue with default state
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      dispatch(setError("Please enter a valid email address."));
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeToNewsletter(email, user?.id);

      if (result.success) {
        setIsSubscribed(true);
        setEmail("");
        dispatch(setError({
          message: "Successfully subscribed to HyperLead newsletter!",
          type: "success"
        }));
      } else {
        dispatch(setError(result.error));
      }
    } catch (error) {
      dispatch(setError("Failed to subscribe. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Show loading while checking status
  if (checkingStatus) {
    return (
      <div className="w-[300px] relative mb-2">
        <div className="text-sm text-gray-500">Checking subscription...</div>
      </div>
    );
  }

  // Show subscribed message if already subscribed
  if (isSubscribed) {
    return (
      <div className="w-[300px] relative mb-2">
        <div className="text-sm text-green-600 font-medium">
          ✓ You have subscribed to HyperLead newsletter
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-[300px] relative mb-2">
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        autoComplete="email"
        disabled={loading}
        className="w-full pr-20"
      />
      <Button
        type="submit"
        className="absolute right-0 bottom-0 h-full"
        loading={loading}
        disabled={loading}
      >
        Subscribe
      </Button>
    </form>
  );
};

export default SubscribeForm;
