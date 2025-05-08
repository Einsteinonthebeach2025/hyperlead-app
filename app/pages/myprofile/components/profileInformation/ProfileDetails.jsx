import CardContainer from "app/components/containers/CardContainer";
import InfoContainer from "app/components/containers/InfoContainer";
import Title from "app/components/Title";

const ProfileDetails = ({ profile }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <CardContainer>
        <Title>Personal Information</Title>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <InfoContainer text="Email" subText={profile?.email} />
          <InfoContainer text="Phone" subText={profile?.phone} />
          <InfoContainer text="Company" subText={profile?.company} />
          <InfoContainer text="Position" subText={profile?.position} />
          <InfoContainer text="Gender" subText={profile?.sex} />
        </div>
      </CardContainer>
      <CardContainer>
        <Title>Address</Title>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <InfoContainer text="Country" subText={profile?.country} />
          <InfoContainer text="City" subText={profile?.city} />
          <InfoContainer text="address" subText={profile?.address} />
          <InfoContainer text="Date" subText={profile?.userBirthDate} />
        </div>
      </CardContainer>
    </div>
  );
};

export default ProfileDetails;
