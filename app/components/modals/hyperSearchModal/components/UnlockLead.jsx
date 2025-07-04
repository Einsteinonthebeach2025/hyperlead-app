import Button from 'app/components/buttons/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setToggle } from 'app/features/modalSlice'
import { selectUser } from 'app/features/userSlice'

const UnlockLead = ({ leadId, isUnlocked, handleClose }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userId = user?.id
  const userEmail = user?.email
  const userName = user?.profile?.userName || user?.user_metadata?.name;
  const [loading, setLoading] = useState(false)


  const handleUnlock = () => {
    if (!userId || !userEmail || !userName) {
      dispatch(setError({ message: "User not authenticated", type: "error" }));
      return;
    }
    const subscription = user?.profile?.subscription;
    const unlockedLeadsCount = user?.profile?.unlocked_leads_count || 0;
    let maxUnlocks = 0;
    if (subscription === "PRO") maxUnlocks = 10;
    else if (subscription === "HYPER") maxUnlocks = 25;
    if (maxUnlocks > 0 && unlockedLeadsCount >= maxUnlocks) {
      dispatch(setError({ message: `You have reached your monthly unlock limit (${maxUnlocks}).`, type: "error" }));
      return;
    }
    dispatch(
      setToggle({
        modalType: "paypalPayment",
        isOpen: true,
        data: {
          selectedPlan: "SINGLE_LEAD",
          leadId: leadId,
        },
      })
    );
  };

  if (isUnlocked) {
    return (
      <Button type="green" className="text-xs whitespace-nowrap" disabled>
        Lead is already unlocked
      </Button>
    )
  }

  return (
    <Button
      type='extra'
      className='text-xs whitespace-nowrap'
      onClick={handleUnlock}
      disabled={loading}
    >
      {loading ? 'Unlocking...' : 'Unlock Lead'}
    </Button>
  )
}

export default UnlockLead;
