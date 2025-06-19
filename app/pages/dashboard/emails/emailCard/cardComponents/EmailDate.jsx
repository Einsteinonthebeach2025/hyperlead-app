import FlexBox from "app/components/containers/FlexBox";
import { formatTime } from "app/helpers/utils";

const EmailDate = ({ item }) => {
  const sent = formatTime(item?.sent_at);
  const opened = item?.opened_at;

  console.log(opened);


  return (
    <FlexBox
      type="row-center"
      className="text-sm text-neutral-500 text-[10px] w-fit gap-2"
    >
      <p>
        <span className="font-bold">Sent:</span> {sent}
      </p>
      •{" "}
      {opened && (
        <p>
          <span className="font-bold">Opened: </span>
          {formatTime(opened)}
        </p>
      )}
    </FlexBox>
  );
};

export default EmailDate;
