import EmailSearchBar from "./EmailSearchBar";
import EmailFilterBar from "./EmailFilterBar";
import FlexBox from "app/components/containers/FlexBox";
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
      <FlexBox type="row-between">
        <EmailFilterBar
          month={month}
          setMonth={setMonth}
          delivered={delivered}
          setDelivered={setDelivered}
          opened={opened}
          setOpened={setOpened}
        />
        <EmailSearchBar search={search} setSearch={setSearch} />
      </FlexBox>
    </div>
  );
};

export default EmailFilter;
