"use client";
import React from "react";
import Button from "./components/buttons/Button";
import { simulateSubscriptionExpiration } from "./lib/actions/leadActions";
import { useDispatch } from "react-redux";
import { setError } from "./features/modalSlice";
import supabase from "./lib/config/supabaseClient";

const SimulateExpire = () => {
  const dispatch = useDispatch();

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
    <div>
      <Button onClick={handleTestExpiration}>
        Test Subscription Expiration
      </Button>
    </div>
  );
};

export default SimulateExpire;
