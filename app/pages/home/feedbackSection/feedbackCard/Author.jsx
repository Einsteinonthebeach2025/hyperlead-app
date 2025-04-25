import FlexBox from "app/components/containers/FlexBox";
import Image from "next/image";

const Author = ({ item = {} }) => {
  const { userName, email, avatar_url } = item;
  return (
    <div className="flex flex-col mt-4">
      <FlexBox type="row">
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={avatar_url || "/assets/noPhoto.jpg"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="capitalize ml-2">{userName}</span>
      </FlexBox>
      <span className="text-[12px] italic mt-1">{email}</span>
    </div>
  );
};

export default Author;
