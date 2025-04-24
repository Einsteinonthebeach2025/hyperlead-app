"use client";
import ResetForm from "./ResetForm";
import ResetError from "./ResetError";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "app/features/modalSlice";
import { validateEmail } from "app/helpers/validateEmail";
import { sendPasswordResetEmail } from "app/lib/actions/authActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.modal);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
        setSuccess(true);
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
      <ResetError error={error} success={success} />
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
