"use client";
import { useRouter } from "next/navigation";
import { assignDemoLeads } from "app/lib/actions/leadActions";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import { updateProfile } from "app/lib/actions/profileActions";
import { setToggle } from "app/features/modalSlice";
import { updateUserProfile } from "app/features/userSlice";
import SelectionForm from "app/components/SelectionForm";
import preferencesData from "app/localDB/preferencesData";


const Preferences = ({ initialPreferences = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isNewUser = user?.profile?.is_new_user;

  const handleSuccess = async (selections) => {
    try {
      if (isNewUser) {
        const { success, error } = await assignDemoLeads(
          user.id,
          user.email,
          selections
        );
        if (!success) {
          console.error("Demo leads assignment error:", error);
          dispatch(setError("Failed to assign demo leads"));
          return;
        }
        dispatch(setToggle({
          modalType: "global",
          isOpen: true,
          data: {
            title: `welcome ${user?.profile?.userName || user?.user_metadata?.name} to hyperlead`,
            desc: "you have become a member of the hyperlead family. you have received demo leads and can now begin to observe your dashboard.",
          },
        }));
        await updateProfile(user.id, { is_new_user: false });
        dispatch(updateUserProfile({ is_new_user: false }));
      }
      dispatch(
        setError({
          message: "Preferences updated successfully.",
          type: "success",
        })
      );
      router.push("/dashboard/activities");
    } catch (error) {
      dispatch(setError("Failed to update preferences"));
    }
  };
  return (
    <SelectionForm
      updateField="preferences"
      title="Choose Your Industry Focus"
      description=" Select the industries you want leads from. We'll tailor your recommendations to match your business goals.
You can update preferences anytime."
      className="h-screen"
      minSelections={1}
      data={preferencesData}
      initialSelections={initialPreferences}
      onSuccess={handleSuccess}
    />
  );
};


export default Preferences;
