"use client";
import { useState, useMemo } from "react";
import { filterEmails } from "app/helpers/filterHelpers";
import EmailCard from "./emailCard/EmailCard";
import EmailFilter from "./emailFiltering/EmailFilter";
import SectionHeadline from "app/components/SectionHeadline";
import DashboardPageWrapper from "app/components/containers/DashboardPageWrapper";

const Emails = ({ data }) => {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("all");
  const [delivered, setDelivered] = useState("all");
  const [opened, setOpened] = useState("all");

  const filteredData = useMemo(() => {
    return filterEmails(data, { search, month, delivered, opened });
  }, [data, search, month, delivered, opened]);

  if (data?.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title="No emails found"
          desc="After sending an emails, you will have your outbox here"
        />
      </div>
    );
  }

  return (
    <DashboardPageWrapper title="Emails">
      <EmailFilter
        data={data}
        search={search}
        setSearch={setSearch}
        month={month}
        setMonth={setMonth}
        delivered={delivered}
        setDelivered={setDelivered}
        opened={opened}
        setOpened={setOpened}
      />
      <EmailCard data={filteredData} />
    </DashboardPageWrapper>
  );
};

export default Emails;
