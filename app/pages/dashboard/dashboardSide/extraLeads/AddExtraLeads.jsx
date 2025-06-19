"use client"
import Button from 'app/components/buttons/Button';
import { useToggle } from 'app/hooks/useToggle';
import { AiOutlineThunderbolt } from "react-icons/ai";


const AddExtraLeads = ({ type = "success" }) => {
  const { toggle } = useToggle();

  return (
    <div className="w-full">
      <Button type={type} onClick={toggle}>
        <AiOutlineThunderbolt />
        <span>Add extra leads</span>
      </Button>
    </div>
  )
}

export default AddExtraLeads