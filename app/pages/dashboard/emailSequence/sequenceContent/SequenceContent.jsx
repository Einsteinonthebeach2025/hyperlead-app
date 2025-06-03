import CardContainer from 'app/components/containers/CardContainer'
import SequenceRecipientsInfo from './sequenceRecipientsInfo/SequenceRecipientsInfo'
import EmailContent from './sequenceRecipientsInfo/EmailContent'
import SequenceButtons from './actionButtons/SequenceButtons'
import { deleteEmailSequence } from 'app/lib/actions/emailActions'

const SequenceContent = ({ active, onDeleteSequence }) => {

  const handleDelete = async () => {
    const result = await deleteEmailSequence(active.sequence_id)
    if (result.success) {
      onDeleteSequence(active.sequence_id)
    }
  }

  return (
    <CardContainer className="w-full space-y-3">
      <SequenceButtons id={active.sequence_id} onDelete={handleDelete} type="sequence" />
      <EmailContent data={active} />
      <SequenceRecipientsInfo data={active.recipients} />
    </CardContainer>
  )
}

export default SequenceContent