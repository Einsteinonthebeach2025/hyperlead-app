"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdLogIn } from "react-icons/io";
import { signIn } from "app/lib/actions/authActions";
import Link from "next/link";
import { setError } from "app/features/modalSlice";
import Button from "app/components/buttons/Button";

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!dispatch) return;
    try {
      setLoading(true);
      const { error } = await signIn({ email, password });
      if (error) {
        dispatch(setError(error));
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (error) {
      dispatch(setError("Something went wrong. Please try again later."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full" noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="userEmail"
          type="email"
          name="email"
          placeholder="Your Email"
          autoComplete="false"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link
          className="text-[12px] text-blue-500 hover:underline ml-1"
          href="/resetpassword"
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        className="mx-auto"
        type="submit"
        text="Logging In"
        loading={loading}
        disable={loading}
      >
        <IoMdLogIn size={20} />
        <span>Login</span>
      </Button>
    </form>
  );
};

export default SignInForm;
