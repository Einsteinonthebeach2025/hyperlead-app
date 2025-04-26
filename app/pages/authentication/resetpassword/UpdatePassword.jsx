"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { setError } from "app/features/modalSlice";
import { validatePassword } from "app/helpers/validatePwd";
import { updatePassword } from "app/lib/actions/authActions";
import supabase from "app/lib/config/supabaseClient";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionVerified, setSessionVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          const url = new URL(window.location.href);
          const token = url.searchParams.get("token");
          const type = url.searchParams.get("type");
          if (token && type === "recovery") {
            const { error: recoveryError } = await supabase.auth.verifyOtp({
              token,
              type: "recovery",
            });
            if (recoveryError) throw recoveryError;
            setSessionVerified(true);
          } else {
            throw new Error("No valid session or recovery token found");
          }
        } else {
          setSessionVerified(true);
        }
      } catch (error) {
        dispatch(
          setError(
            "Invalid or expired reset link. Please request a new password reset email."
          )
        );
        router.push("/");
      }
    };
    verifyToken();
  }, [dispatch, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionVerified) {
      dispatch(setError("Please verify your session first"));
      return;
    }
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
        dispatch(setError({ message, type: "success" }));
        router.push("/");
      }
    } catch (error) {
      dispatch(setError("An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  if (!sessionVerified) {
    return <div>Verifying your session...</div>;
  }

  return (
    <UpdatePasswordForm
      loading={loading}
      password={password}
      confirmPassword={confirmPassword}
      handleSubmit={handleSubmit}
      setConfirmPassword={setConfirmPassword}
      setPassword={setPassword}
    />
  );
};

export default UpdatePassword;
