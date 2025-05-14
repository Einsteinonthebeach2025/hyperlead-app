import FlexBox from "app/components/containers/FlexBox";
import { formatTime } from "app/helpers/utils";

const NotificationList = ({ data }) => {
  return (
    <FlexBox type="column" className="grow-1 h-[360px] overflow-y-auto">
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

const Importance = ({ item }) => {
  const getColor = (level) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-500 border-green-500 bg-green-100/80";
      case "medium":
        return "text-amber-500 border-amber-500 bg-amber-100/80";
      case "high":
        return "text-red-500 border-red-500 bg-red-100/80";
    }
  };
  return (
    <div>
      <span
        className={`text-[10px] pointer-events-none font-semibold uppercase px-2 tracking-wider border rounded-sm ${getColor(item)}`}
      >
        Priority {item}
      </span>
    </div>
  );
};
export default NotificationList;
