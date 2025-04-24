import Button from "app/components/buttons/Button";
import { FaEnvelope } from "react-icons/fa";

const SubmitButtons = ({ isSending }) => {
  return (
    <div className="flex justify-end space-x-3">
      <Button type="submit" className="gap-2" disabled={isSending}>
        <FaEnvelope />
        {isSending ? "Sending..." : "Send Email"}
      </Button>
    </div>
  );
};

export default SubmitButtons;
