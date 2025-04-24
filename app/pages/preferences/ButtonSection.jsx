import Button from "app/components/buttons/Button";
import MotionChildren from "app/components/containers/MotionChildren";
import { IoIosArrowForward } from "react-icons/io";

const ButtonSection = ({ updatePref, pref, loading }) => {
  return (
    <MotionChildren animation="fade-in">
      <Button
        type="light"
        text="Updating..."
        loading={loading}
        onClick={updatePref}
        disabled={pref?.length !== 3 || loading}
      >
        <span>Update Preferences</span>
        <IoIosArrowForward size={20} />
      </Button>
    </MotionChildren>
  );
};

export default ButtonSection;
