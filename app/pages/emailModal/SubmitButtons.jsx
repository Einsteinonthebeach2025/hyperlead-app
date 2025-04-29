import Button from "app/components/buttons/Button";
import { FaEnvelope } from "react-icons/fa";

const SubmitButtons = ({ loading }) => {
  return (
    <Button loading={loading} type="submit" disabled={loading}>
      <FaEnvelope />
      <span>Send Email</span>
    </Button>
  );
};

export default SubmitButtons;
