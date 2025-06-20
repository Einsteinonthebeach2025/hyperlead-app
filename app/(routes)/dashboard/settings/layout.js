import React from "react";
import DashboardSettingsNavBar from "app/pages/dashboard/settings/DashboardSettingsNavBar";
import Title from "app/components/Title";
import DashboardPageWrapper from "app/components/containers/DashboardPageWrapper";
import FlexBox from "app/components/containers/FlexBox";

export const metadata = {
  title: "Hyperlead | Settings",
  description: "User settings page",
};

export default function SettingsLayout({ children }) {
  return (
    <DashboardPageWrapper>
      <FlexBox type="column">
        <Title>Account</Title>
      </FlexBox>
      <DashboardSettingsNavBar />
      {children}
    </DashboardPageWrapper>
  );
}
