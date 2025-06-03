import EmailStatus from "app/components/buttons/EmailStatus";
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

export default EmailDetails;
