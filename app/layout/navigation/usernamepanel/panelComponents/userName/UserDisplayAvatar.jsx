import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const UserDisplayAvatar = ({ url }) => {
  return (
    <>
      {url ? (
        <div className="rounded-full w-10 h-10 overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={url}
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
    </>
  );
};

export default UserDisplayAvatar;
