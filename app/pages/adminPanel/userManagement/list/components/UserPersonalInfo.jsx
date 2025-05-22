import FlexBox from 'app/components/containers/FlexBox';
import SpanText from 'app/components/SpanText';
import SubTitle from 'app/components/SubTitle';
import UserDisplayAvatar from 'app/layout/navigation/usernamepanel/panelComponents/userName/UserDisplayAvatar';
import SubscribtionStatus from 'app/pages/myprofile/components/profileInformation/SubscribtionStatus';

const UserPersonalInfo = ({ item }) => {
  const { firstName, lastName, email, avatar_url, userName, } = item;

  return (
    <FlexBox type="column" className="gap-2">
      <FlexBox type="row" className="gap-2 items-center">
        <UserDisplayAvatar className="w-14 h-14" url={avatar_url} />
        <div>
          {firstName && lastName ? <SubTitle>{firstName} {lastName}</SubTitle> : <SubTitle>{userName}</SubTitle>}
          <SpanText className="lowercase">{email}</SpanText>
        </div>
      </FlexBox>
      <SubscribtionStatus item={item} />
    </FlexBox>
  )
}

export default UserPersonalInfo