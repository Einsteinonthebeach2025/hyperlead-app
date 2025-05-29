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

  const handleSuccess = async (selections) => {
    const { success, error, assignedLeadsCount } = await assignDemoLeads(
      user.id,
      user.email,
      selections
    );
    if (!success) {
      console.error("Demo leads assignment error:", error);
      dispatch(setError("Failed to assign demo leads"));
      return;
    }
    dispatch(
      setError({
        message: `Preferences updated successfully. You've received ${assignedLeadsCount} demo leads!`,
        type: "success",
      })
    );
    router.push("/regions");
  };

  return (
    <SelectionForm
      updateField="preferences"
      title="Select Your Preferences"
      description="Choose any preferences that best match your industry focus"
      className="h-screen"
      minSelections={1}
      data={preferencesData}
      initialSelections={initialPreferences}
      onSuccess={handleSuccess}
    />
  );
};

export default Preferences;
