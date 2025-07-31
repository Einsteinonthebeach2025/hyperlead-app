import FlexBox from "app/components/containers/FlexBox";
import SpanText from "app/components/SpanText";
import { formatTime } from "app/helpers/utils";
import Image from "next/image";
import { FaUserLarge } from "react-icons/fa6";

const Author = ({ item = {} }) => {
  const { userName, avatar_url, created_at } = item;

  return (
    <div className="flex flex-col mt-4 ">
      <FlexBox type="row" className="items-center">
        <div className="relative w-4 h-4 lg:w-9 lg:h-8 rounded-full overflow-hidden">
          {avatar_url ? (
            <Image
              src={avatar_url}
              alt="avatar"
              className="object-cover w-full h-full"
              width={40}
              height={40}
            />
          ) : (
            <FaUserLarge className="w-full h-full" />
          )}
        </div>
        <FlexBox type="row-between" className="w-full">
          <span className="capitalize ml-2 text-[10px] lg:text-base font-medium dark:text-neutral-100">{userName}</span>
          <SpanText className="mt-1 italic">{formatTime(created_at)}</SpanText>
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default Author;
