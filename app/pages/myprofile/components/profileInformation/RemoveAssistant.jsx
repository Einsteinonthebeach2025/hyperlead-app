"use client";
import Button from 'app/components/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'app/features/userSlice'
import { setError } from 'app/features/modalSlice'
import { removeAssistantFromUser } from 'app/lib/actions/profileActions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RemoveAssistant = ({ assistantEmail }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(false)

    const handleRemoveAssistant = async () => {
        if (!assistantEmail) return
        setLoading(true)
        try {
            const { success, error } = await removeAssistantFromUser(user.id, assistantEmail)

            if (success) {
                dispatch(setError({
                    message: "Assistant removed successfully",
                    type: "success"
                }))
                onAssistantRemoved?.()
                router.refresh()
            } else {
                dispatch(setError(error))
            }
        } catch (error) {
            dispatch(setError("Failed to remove assistant"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            type="delete"
            onClick={handleRemoveAssistant}
            loading={loading}
            disabled={loading}
        >
            <span>Remove Assistant</span>
        </Button>
    )
}

export default RemoveAssistant