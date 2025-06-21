import { VscSparkle } from "react-icons/vsc";
import { FaEnvelope } from 'react-icons/fa'
import { useState } from "react";
import Button from 'app/components/buttons/Button'
import SpanText from 'app/components/SpanText'
import ToggleSwitch from 'app/components/ToggleSwitch'
import FlexBox from 'app/components/containers/FlexBox'
import AiButton from 'app/components/buttons/AiButton'
import HoverModal from 'app/components/modals/HoverModal';

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
      <VscSparkle />
    </AiButton>
  )
}

const FollowUpEmail = ({ formData, setFormData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FlexBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="row-start" className="gap-1 items-center relative cursor-pointer">
      <SpanText>Enable Follow-Up</SpanText>
      <ToggleSwitch
        small
        checked={formData.follow_up}
        onChange={() => setFormData(f => ({ ...f, follow_up: !f.follow_up }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <HoverModal
        isOpen={isHovered}
        text="By enabling this option, a follow-up email will be automatically sent after 73 hours"
        className="-top-13 -left-28 mt-1"
      />
    </FlexBox>
  );
};

export default EmailFormButtons