import Button from "app/components/buttons/Button";
import GoogleButton from "app/components/buttons/GoogleButton";
import { MdAccountCircle } from "react-icons/md";

const FormButtons = ({ loading }) => {
  return (
    <div className="flex justify-between items-center">
      <Button
        type="submit"
        text="creating account"
        loading={loading}
        disabled={loading}
      >
        <MdAccountCircle size={20} />
        <span>create account</span>
      </Button>
      <GoogleButton />
    </div>
  );
};

export default FormButtons;
