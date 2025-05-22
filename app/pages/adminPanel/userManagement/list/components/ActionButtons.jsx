import FlexBox from 'app/components/containers/FlexBox';
import SendNotificationButton from 'app/components/buttons/SendNotificationButton';
import SendEmailButton from 'app/components/buttons/SendEmailButton';
import SubTitle from 'app/components/SubTitle';

const ActionButtons = ({ item }) => {
  const { id, email } = item;
  return (
    <div>
      <SubTitle>Actions</SubTitle>
      <FlexBox type="row" className="gap-2 mt-1">
        <SendEmailButton lead={{ id, email }} type="user" />
        <SendNotificationButton user={{ id, email }} />
      </FlexBox>
    </div>
  )
}

export default ActionButtons