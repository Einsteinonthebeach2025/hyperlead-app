"use client"
import { setError } from 'app/features/modalSlice'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const Delete = ({ id, onDelete, type = 'item' }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(id);
      dispatch(setError({
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
        type: "success"
      }));
    } catch (error) {
      dispatch(setError({
        message: `Failed to delete ${type}`,
        type: "error"
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={handleDelete}
      className={`cursor-pointer w-fit text-red-400 hover:text-red-500 duration-300 ${loading ? "opacity-50" : ""}`}
    >
      <FaTrashAlt size={19} />
    </div>
  )
}

export default Delete