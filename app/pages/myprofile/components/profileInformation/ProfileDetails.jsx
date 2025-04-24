import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";

const ProfileDetails = ({ profile }) => {
  const renderProfileField = (label, value) => {
    if (!value) return null;
    return (
      <FlexBox type="row-start">
        <span className="text-neutral-400 italic capitalize w-18 text-start mr-4">
          {label}:
        </span>
        <SubTitle>{value}</SubTitle>
      </FlexBox>
    );
  };

  return (
    <div className=" my-6 w-full center flex-col">
      {renderProfileField("Country", profile?.country)}
      {renderProfileField("City", profile?.city)}
      {renderProfileField("Phone", profile?.phone)}
      {renderProfileField("Date", profile?.userBirthDate)}
      {renderProfileField("Sex", profile?.sex)}
      {renderProfileField("Company", profile?.company)}
      {renderProfileField("Address", profile?.address)}
    </div>
  );
};

export default ProfileDetails;
