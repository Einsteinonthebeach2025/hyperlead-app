import FlexBox from "app/components/containers/FlexBox";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";

const ProfileInformation = ({ profile }) => {
  return (
    <FlexBox type="center-col" className="mt-20 space-y-3 w-full mb-3">
      <ProfileHeader profile={profile} />
      <ProfileDetails profile={profile} />
    </FlexBox>
  );
};

export default ProfileInformation;
