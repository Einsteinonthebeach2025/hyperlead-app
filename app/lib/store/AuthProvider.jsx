"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../actions/authActions";
import supabase from "../config/supabaseClient";
import { setLoading, setUser } from "app/features/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data, error } = await getCurrentUser();

        if (error) {
          console.error("Session check error:", error);
          dispatch(setUser(null));
        } else {
          dispatch(setUser(data));
        }
      } catch (error) {
        console.error("Error checking session:", error);
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        const { data, error } = await getCurrentUser();
        if (!error) {
          dispatch(setUser(data));
        }
      } else if (event === "SIGNED_OUT") {
        dispatch(setUser(null));
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
