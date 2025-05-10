"use client";
import { useState, useMemo } from "react";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";
import EmailCard from "./emailCard/EmailCard";
import EmailFilter from "./emailFiltering/EmailFilter";
import { filterEmails } from "app/helpers/filterHelpers";

const Emails = ({ data }) => {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("all");
  const [delivered, setDelivered] = useState("all");
  const [opened, setOpened] = useState("all");

  const filteredData = useMemo(() => {
    return filterEmails(data, { search, month, delivered, opened });
  }, [data, search, month, delivered, opened]);

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
