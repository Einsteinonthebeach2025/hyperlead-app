import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { deleteBug, updateFeedback, deleteFeedback } from 'app/lib/actions/reportActions';
import { notifyUserOnBugFix } from 'app/lib/actions/notificationActions';
import Button from 'app/components/buttons/Button';
import FlexBox from 'app/components/containers/FlexBox'

const ActionButtons = ({ item, onDelete, type = 'bug' }) => {
  const dispatch = useDispatch();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      let result;
      if (type === 'feedback') {
        result = await deleteFeedback(item.id);
        if (!result.success) throw new Error(result.error);
      } else {
        result = await deleteBug(item.id);
        if (!result.success) throw new Error(result.error);
      }

      dispatch(setError({
        message: `${type === 'bug' ? 'Bug' : 'Feedback'} deleted successfully`,
        type: "success"
      }));
      onDelete(item.id);
    } catch (error) {
      dispatch(setError({
        message: error.message || 'Failed to delete',
        type: "error"
      }));
    }
    setIsDeleteLoading(false);
  };

  const handleAction = async () => {
    setIsActionLoading(true);
    try {
      if (type === 'bug') {
        const result = await notifyUserOnBugFix(item.id);
        if (!result.data) throw new Error(result.error);
        dispatch(setError({
          message: "Bug marked as fixed and notification sent",
          type: "success"
        }));
        onDelete(item.id);
        await deleteBug(item.id);
      } else {
        const result = await updateFeedback(item.id, 'approved');
        if (!result.data) throw new Error(result.error);
        dispatch(setError({
          message: "Feedback approved successfully",
          type: "success"
        }));
        onDelete(item.id);
      }
    } catch (error) {
      dispatch(setError({
        message: error.message || `Failed to ${type === 'bug' ? 'mark bug as fixed' : 'approve feedback'}`,
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