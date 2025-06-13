"use client"
import Button from 'app/components/buttons/Button';
import { useToggle } from 'app/hooks/useToggle';
import { IoMdAdd } from "react-icons/io";

const AddExtraLeads = ({ type = "success" }) => {
  const { toggle } = useToggle();

  return (
    <div className="w-full">
      <Button type={type} onClick={toggle}>
        <span>Add extra leads</span>
        <IoMdAdd />
      </Button>
    </div>
  )
}

export default AddExtraLeads