import FlexBox from "app/components/containers/FlexBox";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import Paragraph from "app/components/Paragraph";

const ProfileInformation = ({ profile }) => {

  return (
    <FlexBox type="center-col" className="space-y-4 w-full mb-3">
      <Paragraph>Profile Information</Paragraph>
      <ProfileHeader profile={profile} />
      <ProfileDetails profile={profile} />
    </FlexBox>
  );
};

export default ProfileInformation;
