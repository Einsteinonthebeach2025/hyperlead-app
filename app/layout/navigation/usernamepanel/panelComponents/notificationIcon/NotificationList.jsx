import FlexBox from "app/components/containers/FlexBox";
import Importance from "app/components/Importance";
import { formatTime } from "app/helpers/utils";

const NotificationList = ({ data }) => {
  return (
    <FlexBox type="column" className="grow-1 max-h-[360px] overflow-y-auto">
      {data?.map((item) => {
        return (
          <div
            className="bg-neutral-200/40 hover:bg-neutral-200/80 px-2 py-1 cursor-pointer rounded-md duration-300 my-1"
            key={item.id}
          >
            <div className="text-[12px]">
              <strong>System</strong> •
              <span className=" text-neutral-500"> {item.message}</span>
              <br /> <strong>Hyperlead App</strong>
              <FlexBox className="gap-2 w-fit">
                <Importance item={item?.importance} /> •
                <span className="text-neutral-600 font-light text-[10px]">
                  {formatTime(item.created_at)}
                </span>
              </FlexBox>
            </div>
          </div>
        );
      })}
    </FlexBox>
  );
};

export default NotificationList;
