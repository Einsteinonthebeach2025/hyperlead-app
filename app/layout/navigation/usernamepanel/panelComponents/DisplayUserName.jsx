import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { selectUser } from "app/features/userSlice";
import ProfileSettings from "./userName/ProfileSettings";
import UserDisplayName from "./userName/UserDisplayName";
import UserDisplayAvatar from "./userName/UserDisplayAvatar";
import FlexBox from "app/components/containers/FlexBox";
import NotificationsIcon from "./notificationIcon/NotificationsIcon";
import DarkModeIcon from "./darkMode/DarkModeIcon";

const DisplayUserName = () => {
  const { isOpen, toggleState } = useToggleLocal(false);
  const user = useSelector(selectUser);

  const handleActive = () => {
    toggleState(!isOpen);
  };

  const avatar = user?.profile?.avatar_url || user?.user_metadata?.avatar_url;


  return (
    <div className="relative">
      <FlexBox className="gap-1 relative">
        <FlexBox type="row" className="gap-3">
          <DarkModeIcon />
          <NotificationsIcon />
        </FlexBox>
        <FlexBox
          onClick={handleActive}
          type="row"
          className="gap-2 cursor-pointer items-center"
        >
          <UserDisplayName user={user} />
          <UserDisplayAvatar className="w-10 h-10" url={avatar} />
          <div className="dark:text-stone-300">
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </FlexBox>
      </FlexBox>
      <ProfileSettings isOpen={isOpen} handleActive={handleActive} />
    </div>
  );
};

export default DisplayUserName;
