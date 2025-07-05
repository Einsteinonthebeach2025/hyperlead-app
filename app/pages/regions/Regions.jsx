"use client";
import dynamic from "next/dynamic";
import SelectionForm from "app/components/SelectionForm";
import regionsData from "app/localDB/regionsData";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { setToggle } from "app/features/modalSlice";
import { updateProfile } from "app/lib/actions/profileActions";

const WorldMap = dynamic(
  () =>
    import("../dashboard/activities/leadsByRegionsStats/components/WorldMap"),
  {
    ssr: false,
  }
);

const Regions = ({ initialRegions = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isNewUser = user?.profile?.is_new_user;
  const userName = user?.profile?.userName || user?.user_metadata?.name;

  const showWelcomeModal = () => {
    dispatch(setToggle({
      modalType: "global",
      isOpen: true,
      data: {
        title: `welcome ${userName} to hyperlead`,
        desc: "you have become a member of the hyperlead family. you have received demo leads and can now begin to observe your dashboard.",
      },
    }));
  };

  const handleSuccess = async (selections) => {
    try {
      if (isNewUser) {
        await updateProfile(user.id, { is_new_user: false });
        dispatch(updateUserProfile({ is_new_user: false }));
      }
      router.push("/dashboard/activities");
      if (isNewUser) {
        setTimeout(showWelcomeModal, 1000);
      }
    } catch (error) {
      console.error("Error in handleSuccess:", error);
    }
  };

  const handleSkip = async () => {
    try {
      if (isNewUser) {
        await updateProfile(user.id, { is_new_user: false });
        dispatch(updateUserProfile({ is_new_user: false }));
      }
      router.push("/dashboard/activities");
      if (isNewUser) {
        setTimeout(showWelcomeModal, 1000);
      }
    } catch (error) {
      console.error("Error in handleSkip:", error);
    }
  };

  return (
    <SelectionForm
      className="h-screen"
      title="Choose Your Ideal Lead Regions"
      description="Tell us where you want your leads from. We'll filter results based on your selections—so you only get what's relevant to your business."
      data={regionsData}
      initialSelections={initialRegions}
      updateField="region"
      successMessage="Regions updated successfully"
      additionalComponents={<WorldMap sortedData={[]} />}
      onSuccess={handleSuccess}
      onSkip={handleSkip}
      subText="If you don't pick any regions, we'll send you high-quality leads from across the globe."
    />
  );
};

export default Regions;
