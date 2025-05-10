import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { selectUser } from "app/features/userSlice";
import ProfileSettings from "./ProfileSettings";
import UserDisplayName from "./panelComponents/UserDisplayName";
import UserDisplayAvatar from "./panelComponents/UserDisplayAvatar";
import FlexBox from "app/components/containers/FlexBox";
import NotificationsIcon from "./panelComponents/NotificationsIcon";
import DarkModeIcon from "./panelComponents/DarkModeIcon";

const DisplayUserName = () => {
  const { isOpen, toggleState } = useToggleLocal(false);
  const user = useSelector(selectUser);

  const handleActive = () => {
    toggleState(!isOpen);
  };

  return (
    <div className="relative">
      <FlexBox className="gap-1 cursor-pointer relative ">
        <FlexBox type="row" className="gap-3">
          <DarkModeIcon />
          <NotificationsIcon />
        </FlexBox>
        <FlexBox onClick={handleActive} type="row" className="gap-3">
          <UserDisplayName user={user} />
          <UserDisplayAvatar user={user} />
        </FlexBox>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </FlexBox>
      <ProfileSettings isOpen={isOpen} handleActive={handleActive} />
    </div>
  );
};

export default DisplayUserName;
