"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import supabase from "app/lib/config/supabaseClient";

const GoogleButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async (e) => {
    if (e) e.preventDefault(); // Prevent any default form action
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" onClick={handleGoogleSignIn} loading={loading}>
      <FcGoogle size={20} />
      <span>GOOGLE</span>
    </Button>
  );
};

export default GoogleButton;
