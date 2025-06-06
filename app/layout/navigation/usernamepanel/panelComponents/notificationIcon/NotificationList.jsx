import FlexBox from "app/components/containers/FlexBox";
import Dot from "app/components/Dot";
import Importance from "app/components/Importance";
import { formatTime } from "app/helpers/utils";
import { useState } from "react";
import AssistancyActionButtons from "./AssistancyActionButtons";

const NotificationList = ({ data }) => {
  const [notifications, setNotifications] = useState(data || []);

  return (
    <FlexBox type="column" className="grow-1 max-h-[360px] overflow-y-auto">
      {notifications?.map((item) => {
        return (
          <div
            className="bg-neutral-200/40 dark:bg-[#151e27] hover:bg-neutral-200/80 dark:hover:bg-[#4b5f74] px-2 py-1 cursor-pointer rounded-md duration-300 my-1"
            key={item.id}
          >
            <div className="text-[12px]">
              <strong className="dark:text-stone-100">System</strong> <Dot />
              <span className=" text-neutral-500 dark:text-stone-300"> {item.message}</span>
              <br /> <strong className="dark:text-stone-100">Hyperlead App</strong>
              <FlexBox type="row-start" className="w-full mt-1">
                <FlexBox type="row-start" className="w-full gap-1 items-center">
                  <Importance item={item?.importance} />
                  <Dot />
                  <span className="text-neutral-600 dark:text-stone-200 font-light text-[10px]">
                    {formatTime(item.created_at)}
                  </span>
                </FlexBox>
                <AssistancyActionButtons item={item} setNotifications={setNotifications} />
              </FlexBox>
            </div>
          </div>
        );
      })}
    </FlexBox>
  );
};

export default NotificationList;
