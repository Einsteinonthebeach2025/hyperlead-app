import { CountryFlags } from "app/components/CountryFlags";
import Title from "app/components/Title";
import ProfileSocialLinks from "./ProfileSocialLinks";
import CardContainer from "app/components/containers/CardContainer";
import SubscribtionStatus from "./SubscribtionStatus";
import Dot from "app/components/Dot";

const ProfileHeader = ({ profile }) => {
  return (
    <CardContainer className="flex flex-col lg:flex-row justify-between w-full px-5">
      <div className="flex flex-col gap-2">
        <SubscribtionStatus item={profile} />
        <Title className="capitalize">
          {profile?.firstName} {profile?.lastName}
        </Title>
        <UserDetails profile={profile} />
      </div>
      <ProfileSocialLinks profile={profile} />
    </CardContainer>
  );
};

const UserDetails = ({ profile }) => {
  return (
    <div className="gap-2 flex flex-col lg:flex-row capitalize text-[10px] lg:text-sm text-neutral-500 dark:text-neutral-300">
      {profile?.country && profile?.city && (
        <>
          <div className="gap-1 flex">
            <CountryFlags style={{ width: "18px", height: "18px" }} countryName={profile?.country} />
            <span>{profile?.country},</span>
            {profile?.city && <span>{profile?.city}</span>}
          </div>
        </>
      )}
      <div className="hidden lg:block">
        <Dot />
      </div>
      <div>
        <span className="">{profile?.position}</span> <Dot /> <span> {profile?.company}</span>

      </div>
    </div>
  );
};

export default ProfileHeader;
