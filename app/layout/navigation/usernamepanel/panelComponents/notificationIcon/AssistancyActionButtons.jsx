import { addAssistantToUser } from 'app/lib/actions/profileActions';
import { notifyAssistantAccept } from 'app/lib/actions/notificationActions';

const AssistancyActionButtons = ({ item, setNotifications }) => {

  const handleAccept = async (item) => {
    const bossId = item.metadata?.bossId;
    const bossName = item.metadata?.bossUserName;
    const assistantEmail = item.metadata?.assistantEmail;
    if (!bossId || !assistantEmail) return;
    const result = await addAssistantToUser(bossId, assistantEmail, item.id, bossName);
    if (result.success) {
      await notifyAssistantAccept(bossId, assistantEmail);
      setNotifications((prev) => prev.filter((n) => n.id !== item.id));
    } else {
      alert(result.error || "Failed to accept assistancy request.");
    }
  };

  return (
    <div className='space-x-1 center *:cursor-pointer min-h-[20px]'>
      {item.type === "assistancy" && (
        <>
          <button
            title="Accept"
            className='green-style border w-5 h-5 rounded-sm'
            onClick={(e) => {
              e.stopPropagation();
              handleAccept(item);
            }}
          >
            ✓
          </button>
          <button
            title="Decline"
            className='red-style border w-5 h-5 rounded-sm'
          >
            ×
          </button></>
      )}
    </div >
  )
}

export default AssistancyActionButtons