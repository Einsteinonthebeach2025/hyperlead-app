"use client";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "app/features/modalSlice";
import { deleteEmail } from "app/lib/actions/emailActions";
import { useRouter } from "next/navigation";

const DeleteButton = ({ item, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const emailId = item?.id;

  const handleDelete = async () => {
    if (loading || !emailId) return;
    setLoading(true);
    try {
      const { success, error } = await deleteEmail(emailId);
      if (!success) {
        dispatch(setError(error));
        return;
      }
      if (onDelete) {
        onDelete(emailId);
      }
      router.refresh();
      dispatch(
        setError({ message: "Email deleted successfully", type: "success" })
      );
    } catch (error) {
      dispatch(setError("Failed to delete email"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleDelete}
      className={`cursor-pointer text-red-400 hover:text-red-500 duration-300 ${loading ? "opacity-50" : ""}`}
    >
      <FaTrashAlt size={19} />
    </div>
  );
};

export default DeleteButton;
