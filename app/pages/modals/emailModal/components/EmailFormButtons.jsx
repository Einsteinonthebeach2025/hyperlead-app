import { MdElectricBolt } from 'react-icons/md'
import { FaEnvelope } from 'react-icons/fa'
import Button from 'app/components/buttons/Button'
import SpanText from 'app/components/SpanText'
import ToggleSwitch from 'app/components/ToggleSwitch'
import FlexBox from 'app/components/containers/FlexBox'
import AiButton from 'app/components/buttons/AiButton'

const EmailFormButtons = ({ loading, formData, setFormData, handleClick }) => {

  const handleAiClick = (e) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <div className='space-y-3 flex items-end flex-col'>
      <FlexBox type="row-between" className="w-full pl-2">
        <AiCompose handleClick={handleAiClick} />
        <FollowUpEmail
          formData={formData}
          setFormData={setFormData}
        />
      </FlexBox>
      <Button loading={loading} type="submit" disabled={loading}>
        <FaEnvelope />
        <span>Send Email</span>
      </Button>
    </div>
  )
}

const AiCompose = ({ handleClick }) => {
  return (
    <AiButton text="compose with ai" onClick={handleClick} >
      <MdElectricBolt />
    </AiButton>
  )
}

const FollowUpEmail = ({ formData, setFormData }) => {
  return (
    <FlexBox type="row-start" className="gap-1 items-center">
      <SpanText>Enable Follow-Up</SpanText>
      <ToggleSwitch small checked={formData.follow_up} onChange={() => setFormData(f => ({ ...f, follow_up: !f.follow_up }))} />
    </FlexBox>
  )
}

export default EmailFormButtons