import FlexBox from "app/components/containers/FlexBox";
import Image from "next/image";

const Author = ({ item = {} }) => {
  const { userName, email, avatar_url } = item;
  return (
    <div className="flex flex-col mt-4 ">
      <FlexBox type="row" className="items-center">
        <div className="relative w-4 h-4 lg:w-8 lg:h-8 rounded-full overflow-hidden">
          <Image
            src={avatar_url || "/assets/noPhoto.jpg"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="capitalize ml-2 text-[10px] lg:text-lg font-medium dark:text-neutral-100">{userName}</span>
      </FlexBox>
      <span className="text-[8px] lg:text-[12px] italic mt-1 dark:text-neutral-300">{email}</span>
    </div>
  );
};

export default Author;
