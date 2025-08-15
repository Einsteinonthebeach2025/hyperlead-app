import IconContainer from "app/components/containers/IconContainer";
import HoverModal from "app/components/modals/HoverModal";
import SpanText from "app/components/SpanText";
import { formatTime } from "app/helpers/utils";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { FaCheckCircle } from "react-icons/fa";

const HasEmailSent = ({ lead }) => {
  const { isOpen, toggleState } = useToggleLocal();

  return (
    <>
      {lead.hasSentEmail && (
        <IconContainer
          size="sm"
          color="green"
          className="relative rounded-md"
          onMouseEnter={() => toggleState(true)}
          onMouseLeave={() => toggleState(false)}
        >
          <FaCheckCircle className="text-green-500 text-lg" />
          <HoverModal
            isOpen={isOpen}
            className="right-10 -top-3 w-28 z-50">
            <div className="*:text-white">
              <SpanText>Email Sent</SpanText>
              <SpanText>Type: {lead.lastEmailSent?.type === 'single_email' ? 'Single' : 'Campaign'}</SpanText>
              {lead.lastEmailSent?.sequence_name && (
                <SpanText>Sequence: {lead.lastEmailSent.sequence_name}</SpanText>
              )}
              <SpanText>Date: {formatTime(lead.lastEmailSent?.sent_at)}</SpanText>
              {lead.sentEmails.length > 1 && (
                <SpanText>
                  +{lead.sentEmails.length - 1} more email{lead.sentEmails.length > 2 ? 's' : ''}
                </SpanText>
              )}
            </div>
          </HoverModal>
        </IconContainer>
      )}</>
  )
}

export default HasEmailSent