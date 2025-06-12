"use client";
import CardContainer from "app/components/containers/CardContainer";
import InfoContainer from "app/components/containers/InfoContainer";
import Title from "app/components/Title";
import RemoveAssistant from "./RemoveAssistant";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import FlexBox from "app/components/containers/FlexBox";

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
    items.map(({ text, key }) => {
      if (key === "user_assistant" && profile?.[key]) {
        if (Array.isArray(profile[key])) {
          return (
            <InfoContainer key={key} text={text}>
              <FlexBox type="column" className=" w-full space-y-2">
                {profile[key].map((assistantEmail) => (
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-1" key={assistantEmail}>
                    <h1 className="font-medium text-sm dark:text-neutral-100">{assistantEmail}</h1>
                    <RemoveAssistant assistantEmail={assistantEmail} />
                  </div>
                ))}
              </FlexBox>
            </InfoContainer>
          );
        } else {
          return (
            <InfoContainer key={key} text={text} subText={profile[key]}>
              <RemoveAssistant assistantEmail={profile[key]} />
            </InfoContainer>
          );
        }
      }
      return <InfoContainer key={key} text={text} subText={profile?.[key]} />;
    });

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      <CardContainer>
        <Title>Personal Information</Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          {renderInfo(personalInfo)}
        </div>
      </CardContainer>
      <CardContainer>
        <Title>Address</Title>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          {renderInfo(addressInfo)}
        </div>
      </CardContainer>
    </div>
  );
};

export default ProfileDetails; 