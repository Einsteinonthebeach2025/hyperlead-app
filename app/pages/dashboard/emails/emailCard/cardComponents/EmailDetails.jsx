import FlexBox from "app/components/containers/FlexBox";
import Paragraph from "app/components/Paragraph";
import SubTitle from "app/components/SubTitle";

const EmailDetails = ({ item }) => {
  return (
    <FlexBox type="row-between" className="w-full">
      <div className="w-full pr-10">
        <SubTitle>{item?.subject}</SubTitle>
        <Paragraph>{item?.message}</Paragraph>
      </div>
      <EmailStatus item={item} />
    </FlexBox>
  );
};

const EmailStatus = ({ item }) => {
  return (
    <FlexBox className="text-[12px] font-medium *:border-2 *:px-2 *:rounded-sm w-20 pointer-events-none">
      {item?.delivered ? (
        <span className="border-green-500 text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900">
          Delivered
        </span>
      ) : (
        <span className="border-red-500 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900">Pending</span>
      )}
    </FlexBox>
  );
};

export default EmailDetails;
