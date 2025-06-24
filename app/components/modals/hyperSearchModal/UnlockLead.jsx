import { useState } from 'react'
import Button from 'app/components/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { unlockingLeads } from 'app/lib/actions/leadActions'
import { setError } from 'app/features/modalSlice'
import { selectUser } from 'app/features/userSlice'

const UnlockLead = ({ leadId, isUnlocked, handleClose }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userId = user?.id
  const userEmail = user?.email
  const userName = user?.profile?.userName || user?.user_metadata?.name;
  const [loading, setLoading] = useState(false)

  const handleUnlock = async () => {
    if (!userId || !userEmail || !userName) {
      dispatch(setError({ message: "User not authenticated", type: "error" }))
      return
    }
    setLoading(true)
    const result = await unlockingLeads(leadId, userId, userEmail, userName)
    setLoading(false)
    if (result.success) {
      handleClose()
      dispatch(setError({ message: "Lead unlocked successfully", type: "success" }))
    } else {
      dispatch(setError({ message: result.error || "Failed to unlock lead", type: "error" }))
    }
  }

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
      loading={loading}
    >
      {loading ? 'Unlocking...' : 'Unlock Lead'}
    </Button>
  )
}

export default UnlockLead;
