import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { deleteBug, updateFeedback } from 'app/lib/actions/reportActions';
import { notifyUserOnBugFix } from 'app/lib/actions/notificationActions';
import Button from 'app/components/buttons/Button';
import FlexBox from 'app/components/containers/FlexBox'

const ActionButtons = ({ item, onDelete, type = 'bug' }) => {
  const dispatch = useDispatch();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const { success, error } = await deleteBug(item.id);
    if (success) {
      dispatch(setError({ message: `${type === 'bug' ? 'Bug' : 'Feedback'} deleted successfully`, type: "success" }));
      onDelete(item.id);
    } else {
      dispatch(setError({ message: error, type: "error" }));
    }
    setIsDeleteLoading(false);
  };

  const handleAction = async () => {
    setIsActionLoading(true);
    let result;

    if (type === 'bug') {
      result = await notifyUserOnBugFix(item.id);
      if (result.data) {
        dispatch(setError({ message: "Bug marked as fixed and notification sent", type: "success" }));
        onDelete(item.id);
        await deleteBug(item.id);
      }
    } else {
      result = await updateFeedback(item.id, 'approved');
      if (result.data) {
        dispatch(setError({ message: "Feedback approved successfully", type: "success" }));
        onDelete(item.id);
      }
    }

    if (!result.data) {
      dispatch(setError({
        message: result.error || `Failed to ${type === 'bug' ? 'mark bug as fixed' : 'approve feedback'}`,
        type: "error"
      }));
    }

    setIsActionLoading(false);
  }

  return (
    <FlexBox className="w-fit gap-2">
      <Button
        type="success"
        onClick={handleAction}
        loading={isActionLoading}
      >
        <span>{type === 'bug' ? 'Fixed' : 'Approve'}</span>
      </Button>
      <Button type="delete" onClick={handleDelete} loading={isDeleteLoading}>
        <span>Delete</span>
      </Button>
    </FlexBox>
  )
}

export default ActionButtons