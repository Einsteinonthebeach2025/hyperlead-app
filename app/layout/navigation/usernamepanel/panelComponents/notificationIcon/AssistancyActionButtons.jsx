"use client"
import { useEffect, useState } from 'react';
import { addAssistantToUser } from 'app/lib/actions/profileActions';
import supabase from 'app/lib/config/supabaseClient';
import Spinner from 'app/components/Spinner';
import { notifyAssistantAccept } from 'app/lib/actions/notificationActions';

const AssistancyActionButtons = ({ item, setNotifications }) => {
  const [alreadyAssistant, setAlreadyAssistant] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfAlreadyAssistant = async () => {
      const bossId = item.metadata?.bossId;
      const assistantEmail = item.metadata?.assistantEmail;
      if (!bossId || !assistantEmail) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("user_assistant")
        .eq("id", bossId)
        .single();
      if (error) {
        console.error("Error checking assistant status:", error);
        return;
      }
      const assistants = data?.user_assistant || [];
      if (assistants.includes(assistantEmail)) {
        setAlreadyAssistant(true);
      }
      setLoading(false);
    };
    checkIfAlreadyAssistant();
  }, [item]);

  const handleAccept = async (item) => {
    const bossId = item.metadata?.bossId;
    const bossName = item.metadata?.bossUserName;
    const assistantEmail = item.metadata?.assistantEmail;
    if (!bossId || !assistantEmail) return;
    const result = await addAssistantToUser(bossId, assistantEmail, item.id, bossName);
    if (result.success) {
      await notifyAssistantAccept(bossId, assistantEmail);
      setNotifications((prev) => prev.filter((n) => n.id !== item.id));
      setAlreadyAssistant(true);
    } else {
      alert(result.error || "Failed to accept assistancy request.");
    }
  };

  return (
    <div className='space-x-1 center *:cursor-pointer min-h-[20px]'>
      {item.type === "assistancy" && (
        loading ? (
          <Spinner />
        ) : !alreadyAssistant && (
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
            </button>
          </>
        )
      )}
    </div>
  )
}

export default AssistancyActionButtons