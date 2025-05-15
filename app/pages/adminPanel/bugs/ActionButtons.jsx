import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { deleteBug } from 'app/lib/actions/reportActions';
import { notifyUserOnBugFix } from 'app/lib/actions/notificationActions';
import Button from 'app/components/buttons/Button';
import FlexBox from 'app/components/containers/FlexBox'

const ActionButtons = ({ item, onDelete }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const { success, error } = await deleteBug(item.id);
    if (success) {
      dispatch(setError({ message: "Bug deleted successfully", type: "success" }));
      onDelete(item.id);
    } else {
      dispatch(setError({ message: error, type: "error" }));
    }
    setIsLoading(false);
  };

  const handleFixed = async () => {
    const { success, error } = await notifyUserOnBugFix(item.id);
  }

  return (
    <FlexBox className="w-fit gap-2">
      <Button type="success">
        <span>Fixed</span>
      </Button>
      <Button type="delete" onClick={handleDelete} loading={isLoading}>
        <span>Delete</span>
      </Button>
    </FlexBox>
  )
}

export default ActionButtons