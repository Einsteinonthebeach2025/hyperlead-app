"use client";
import CardContainer from "app/components/containers/CardContainer";
import InfoContainer from "app/components/containers/InfoContainer";
import Title from "app/components/Title";
import RemoveAssistant from "./RemoveAssistant";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";

const ProfileDetails = () => {
  const user = useSelector(selectUser);
  const profile = user?.profile;

  const personalInfo = [
    { text: "Email", key: "email" },
    { text: "Phone", key: "phone" },
    { text: "Company", key: "company" },
    { text: "Position", key: "position" },
    { text: "Gender", key: "sex" },
    { text: "Current Assistant", key: "user_assistant" },
  ];

  const addressInfo = [
    { text: "Country", key: "country" },
    { text: "City", key: "city" },
    { text: "Address", key: "address" },
    { text: "Date", key: "userBirthDate" },
  ];

  const renderInfo = (items) =>
    items.map(({ text, key }) => (
      <InfoContainer key={key} text={text} subText={profile?.[key]}>
        {key === "user_assistant" && profile?.[key] && (
          <RemoveAssistant
            assistantEmail={profile[key]}
            onAssistantRemoved={handleAssistantRemoved}
          />
        )}
      </InfoContainer>
    ));

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <CardContainer>
        <Title>Personal Information</Title>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderInfo(personalInfo)}
        </div>
      </CardContainer>
      <CardContainer>
        <Title>Address</Title>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderInfo(addressInfo)}
        </div>
      </CardContainer>
    </div>
  );
};

export default ProfileDetails; 