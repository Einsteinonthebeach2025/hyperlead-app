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
