"use client";
import { useRouter } from "next/navigation";
import { assignDemoLeads } from "app/lib/actions/leadActions";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import SelectionForm from "app/components/SelectionForm";
import preferencesData from "app/localDB/preferencesData";


const Preferences = ({ initialPreferences = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const regionLength = user?.profile?.region?.length;

  const handleSuccess = async (selections) => {
    const { success, error } = await assignDemoLeads(
      user.id,
      user.email,
      selections
    );
    if (!success) {
      console.error("Demo leads assignment error:", error);
      dispatch(setError("Failed to assign demo leads"));
      return;
    } else {
      dispatch(
        setError({
          message: "Preferences updated successfully.",
          type: "success",
        })
      );
    }

    if (!regionLength) {
      router.push("/regions");
    } else {
      router.push("/");
    }
  };

  return (
    <SelectionForm
      updateField="preferences"
      title="Choose Your Industry Focus"
      description=" Select the industries you want leads from. We’ll tailor your recommendations to match your business goals.
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
