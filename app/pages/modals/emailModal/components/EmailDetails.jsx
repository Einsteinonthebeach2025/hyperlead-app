import FlexBox from 'app/components/containers/FlexBox'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import { selectUser } from 'app/features/userSlice'
import { useSelector } from 'react-redux'

const EmailDetails = ({ data }) => {
  const user = useSelector(selectUser)
  const recipients = data?.map((lead) => lead);

  return (
    <FlexBox type="row" className="gap-3 *:w-full">
      <div>
        <SpanText>From</SpanText>
        <SubTitle className="lowercase">{user?.email}</SubTitle>
      </div>
      <div>
        <SpanText>To</SpanText>
        {recipients?.length > 1 ? <SubTitle className="lowercase">{recipients.length} recipients selected</SubTitle> : <SubTitle className="lowercase">{recipients[0]?.email}</SubTitle>}
      </div>
    </FlexBox>
  )
}

export default EmailDetails