"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { setError } from "app/features/modalSlice";
import { validatePassword } from "app/helpers/validatePwd";
import { updatePassword } from "app/lib/actions/authActions";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword({ password, confirmPassword, dispatch, setError })) {
      setLoading(false);
      return;
    }

    try {
      const { error, message } = await updatePassword(password);

      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(setError(message));
        router.push("/signin");
      }
    } catch (error) {
      dispatch(setError("An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UpdatePasswordForm
        loading={loading}
        password={password}
        confirmPassword={confirmPassword}
        handleSubmit={handleSubmit}
        setConfirmPassword={setConfirmPassword}
        setPassword={setPassword}
      />
    </>
  );
};

export default UpdatePassword;
