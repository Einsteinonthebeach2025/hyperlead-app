"use client";
import supabase from "app/lib/config/supabaseClient";
import Spinner from "app/components/Spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { notifyUserRegistration } from "app/lib/actions/notificationActions";

const AuthCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        dispatch(setError("User not found"));
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("preferences")
        .eq("id", user.id)
        .single();
      if (!profile || !profile.preferences || profile.preferences.length === 0) {
        router.replace("/preferences");
        await notifyUserRegistration();
      } else {
        router.replace("/");
      }
    };
    checkUser();
  }, [router]);

  return <div className="h-screen center">
    <Spinner />
  </div>;
};

export default AuthCallback;