import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const UserDisplayAvatar = ({ url, className }) => {
  return (
    <>
      {url ? (
        <div className={`rounded-full overflow-hidden ${className}`}>
          <Image
            className="w-full h-full object-cover"
            src={url}
            alt="user-avatar"
            width={200}
            height={200}
            quality={85}
            priority
          />
        </div>
      ) : (
        <div>
          <FaUserCircle size={30} className="text-gray-400" />
        </div>
      )}
    </>
  );
};

export default UserDisplayAvatar;
