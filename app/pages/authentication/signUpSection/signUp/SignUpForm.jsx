"use client";
import Inputs from "./Inputs";
import FormButtons from "./FormButtons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "app/lib/actions/authActions";
import { validateForm } from "app/helpers/validateForm";
import { setError } from "app/features/modalSlice";
import { setLoading, setUser } from "app/features/userSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dispatch) return;
    setLocalLoading(true);
    dispatch(setLoading(true));
    if (
      !validateForm({ email, password, confirmPassword, dispatch, setError })
    ) {
      setLocalLoading(false);
      dispatch(setLoading(false));
      return;
    }
    try {
      const { data, error } = await signUp({ email, password, userName });
      if (error) {
        dispatch(setError(error));
        return;
      }
      if (!data || !data.profile) {
        dispatch(setError("Failed to create user profile"));
        return;
      }
      router.push("/preferences");
      setEmail("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError("An unexpected error occurred. Please try again."));
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Inputs
        email={email}
        userName={userName}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setUserName={setUserName}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <FormButtons loading={loading} />
    </form>
  );
};

export default SignUpForm;
