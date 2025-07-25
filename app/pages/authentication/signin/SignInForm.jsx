"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdLogIn } from "react-icons/io";
import { signIn } from "app/lib/actions/authActions";
import { setError } from "app/features/modalSlice";
import { UAParser } from 'ua-parser-js';
import Link from "next/link";
import Button from "app/components/buttons/Button";
import GoogleButton from "app/components/buttons/GoogleButton";
import TwoFactorAuthModal from "app/components/modals/TwoFactorAuthModal";
import FlexBox from "app/components/containers/FlexBox";

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAError, setTwoFAError] = useState("");
  const [checkingTrust, setCheckingTrust] = useState(false);

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
      setCheckingTrust(true);
      const res = await fetch('/api/auth/check-trust', { method: 'POST' });
      const result = await res.json();
      if (result?.trusted) {
        router.push("/");
      } else if (result?.["2fa_required"]) {
        setShow2FAModal(true);
      } else {
        dispatch(setError("Unexpected response during trust check."));
      }
    } catch (error) {
      dispatch(setError("Something went wrong during login."));
    } finally {
      setLoading(false);
      setCheckingTrust(false);
    }
  };

  const handle2FASubmit = async (code) => {
    setLoading(true);
    setTwoFAError("");
    try {
      const parser = new UAParser();
      const result = parser.getResult();
      const deviceInfo = {
        device: `${result.device.vendor || 'Desktop'} ${result.device.model || ''}`.trim(),
        os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
        browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
      };
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, deviceInfo }),
      });
      const resultData = await res.json();
      if (res.ok) {
        setShow2FAModal(false);
        router.push("/");
      } else {
        setTwoFAError(resultData.error || "Invalid 2FA code.");
      }
    } catch (error) {
      setTwoFAError("An error occurred during 2FA verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4 w-full mb-2" noValidate>
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
        <FlexBox type="row-between">
          <Button
            type="submit"
            text="Logging In"
            loading={loading || checkingTrust}
            disable={loading || checkingTrust}
          >
            <IoMdLogIn size={20} />
            <span>Login</span>
          </Button>
          <GoogleButton />
        </FlexBox>
      </form>
      <TwoFactorAuthModal
        type="login"
        isOpen={show2FAModal}
        onClose={() => setShow2FAModal(false)}
        onSubmit={handle2FASubmit}
        loading={loading}
        error={twoFAError}
      />
    </>
  );
};

export default SignInForm;
