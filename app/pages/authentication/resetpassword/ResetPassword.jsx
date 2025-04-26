"use client";
import ResetForm from "./ResetForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "app/features/modalSlice";
import { validateEmail } from "app/helpers/validateEmail";
import { sendPasswordResetEmail } from "app/lib/actions/authActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    if (!validateEmail({ email, dispatch, setError })) {
      return;
    }
    setLoading(true);
    try {
      const { error, message } = await sendPasswordResetEmail(email);
      if (error) {
        dispatch(setError(error));
        return;
      } else {
        dispatch(setError(message));
        setEmail("");
      }
    } catch (error) {
      dispatch(setError("An unexpecter error ocurred. Try again"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ResetForm
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        loading={loading}
      />
    </>
  );
};

export default ResetPassword;
