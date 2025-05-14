"use client";
import { useState, useMemo } from "react";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";
import EmailCard from "./emailCard/EmailCard";
import EmailFilter from "./emailFiltering/EmailFilter";
import { filterEmails } from "app/helpers/filterHelpers";
import SectionHeadline from "app/components/SectionHeadline";

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
    <div className="py-3 lg:pr-6 space-y-3">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">Emails</Headline>
      </MotionContainer>
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
    </div>
  );
};

export default Emails;
