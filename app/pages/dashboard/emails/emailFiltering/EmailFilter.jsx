import EmailSearchBar from "./EmailSearchBar";
import EmailFilterBar from "./EmailFilterBar";
import Paragraph from "app/components/Paragraph";

const EmailFilter = ({
  search,
  setSearch,
  month,
  setMonth,
  delivered,
  setDelivered,
  opened,
  setOpened,
  data,
}) => {
  return (
    <div className="space-y-1">
      <Paragraph>Filter emails as your need</Paragraph>
      <Paragraph>You have {data?.length} Emails sent </Paragraph>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
        <EmailFilterBar
          month={month}
          setMonth={setMonth}
          delivered={delivered}
          setDelivered={setDelivered}
          opened={opened}
          setOpened={setOpened}
        />
        <EmailSearchBar search={search} setSearch={setSearch} />
      </div>
    </div>
  );
};

export default EmailFilter;
