import CardContainer from 'app/components/containers/CardContainer';
import FlexBox from 'app/components/containers/FlexBox';
import Paragraph from 'app/components/Paragraph';
import SubTitle from 'app/components/SubTitle';
import UserDisplayAvatar from 'app/layout/navigation/usernamepanel/panelComponents/userName/UserDisplayAvatar';

const BugList = ({ bugs }) => {

  return (
    <div className="space-y-3">
      {bugs.map((item) => {
        return <CardContainer key={item.id}>
          <FlexBox className="w-fit">
            <FlexBox> <UserDisplayAvatar url={item?.avatar_url} />
              <p>{item.userName}</p></FlexBox>
            <p>{item.user_email}</p>
          </FlexBox>
          <SubTitle>{item.header}</SubTitle>
          <Paragraph>{item.message}</Paragraph>
          <p>{item.create_at}</p>
        </CardContainer>
      })}
    </div>
  )
}

export default BugList