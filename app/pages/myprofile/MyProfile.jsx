"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { selectUser } from "app/features/userSlice";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import FlexBox from "app/components/containers/FlexBox";
import FormContainer from "app/components/containers/FormContainer";
import Button from "app/components/buttons/Button";
import ProfileInformation from "./components/profileInformation/ProfileInformation";
import GradientContainer from "app/components/containers/GradientContainer";
import ProfileNavLinks from "./components/profileImages/ProfileNavLinks";

const MyProfile = memo(({ data }) => {
  const { isOpen, toggleState } = useToggleLocal(false);
  const user = useSelector(selectUser);
  const profile = user?.profile || data;

  const openForm = useCallback(() => {
    toggleState(true);
  }, [toggleState]);

  return (
    <FlexBox type="center-col" className="relative py-10 space-y-10">
      <GradientContainer />
      <FormContainer className="w-[90%]">
        <FlexBox type="center-col" className="w-full">
          <ProfileNavLinks />
          <ProfileInformation profile={profile} />
          <Button type="blue" className="px-6" onClick={openForm}>
            Update my profile
          </Button>
        </FlexBox>
      </FormContainer>
      <AnimatePresence>{isOpen && <UpdateProfile />}</AnimatePresence>
    </FlexBox>
  );
});

MyProfile.displayName = "MyProfile";

export default MyProfile;
