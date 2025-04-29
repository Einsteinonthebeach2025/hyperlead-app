import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileSettings from "./ProfileSettings";
import Image from "next/image";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { selectUser } from "app/features/userSlice";

const DisplayUserName = () => {
  const { isOpen, toggleState } = useToggleLocal(false);
  const user = useSelector(selectUser);

  const handleActive = () => {
    toggleState(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer relative "
        onClick={handleActive}
      >
        <div className="hidden md:flex flex-col items-end">
          <h1>{user?.profile?.userName}</h1>
          <span className="text-[10px] text-neutral-500">{user?.email}</span>
        </div>
        {user?.profile?.avatar_url ? (
          <div className="rounded-full w-10 h-10 overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={user.profile.avatar_url}
              alt="user-avatar"
              width={40}
              height={40}
              quality={85}
              priority
            />
          </div>
        ) : (
          <div>
            <FaUserCircle size={30} />
          </div>
        )}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <ProfileSettings isOpen={isOpen} handleActive={handleActive} />
    </div>
  );
};

export default DisplayUserName;
