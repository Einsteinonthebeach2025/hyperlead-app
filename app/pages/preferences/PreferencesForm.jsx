"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ButtonSection from "./ButtonSection";
import PrefList from "./PrefList";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import { updateProfile } from "app/lib/actions/profileActions";
import MotionContainer from "app/components/containers/MotionContainer";
import Logo from "app/components/Logo";
import preferencesData from "app/localDB/preferencesData";
import ContentHeadline from "app/components/ContentHeadline";
import { assignDemoLeads } from "app/lib/actions/leadActions";

const PreferencesForm = ({ initialPreferences = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [pref, setPref] = useState(initialPreferences);

  const updatePref = async () => {
    if (pref.length === 0) {
      dispatch(setError("Please select at least one preference"));
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await updateProfile(user.id, {
        preferences: pref,
      });
      if (error) {
        console.error("Update preferences error:", error);
        dispatch(setError(error || "Failed to update preferences"));
        return;
      }
      if (!data) {
        dispatch(setError("No data returned from update"));
        return;
      }
      // assign demo leads
      const {
        success,
        error: demoError,
        assignedLeadsCount,
      } = await assignDemoLeads(user.id, user.email, pref);

      if (!success) {
        console.error("Demo leads assignment error:", demoError);
        dispatch(setError("Failed to assign demo leads"));
        return;
      }
      dispatch(
        setError({
          message: `Preferences updated successfully. You've received ${assignedLeadsCount} demo leads!`,
          type: "success",
        })
      );
      dispatch(updateUserProfile({ preferences: pref }));
      router.push("/regions");
    } catch (error) {
      console.error("Unexpected error in updatePref:", error);
      dispatch(setError("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionContainer
      animation="fade-in"
      className="h-screen w-full center flex-col space-y-8"
    >
      <Logo />
      <ContentHeadline
        type="column-center"
        className="text-center"
        title="Select Your Preferences"
        desc="Choose any preferences that best match your industry focus"
      />
      <PrefList data={preferencesData} pref={pref} setPref={setPref} />
      <ButtonSection pref={pref} loading={loading} updatePref={updatePref} />
    </MotionContainer>
  );
};

export default PreferencesForm;
