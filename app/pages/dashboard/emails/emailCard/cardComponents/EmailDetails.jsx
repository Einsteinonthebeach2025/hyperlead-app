import EmailStatus from "app/components/buttons/EmailStatus";
import Paragraph from "app/components/Paragraph";
import SubTitle from "app/components/SubTitle";

const EmailDetails = ({ item }) => {
  return (
    <div className="w-full flex-col lg:flex-row flex justify-between">
      <div className="w-full lg:pr-10 mb-2">
        <SubTitle>{item?.subject}</SubTitle>
        <Paragraph>{item?.message}</Paragraph>
      </div>
      <EmailStatus item={item} />
    </div>
  );
};

export default EmailDetails;
