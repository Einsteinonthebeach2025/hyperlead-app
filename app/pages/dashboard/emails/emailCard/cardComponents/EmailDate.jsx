import FlexBox from "app/components/containers/FlexBox";

const EmailDate = ({ item }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const sent = formatDate(item?.sent_at);
  const opened = formatDate(item?.opened_at);

  return (
    <FlexBox
      type="row-center"
      className="text-sm text-neutral-500 text-[10px] w-fit gap-2"
    >
      <p>
        <span className="font-bold">Sent:</span> {sent}
      </p>
      •{" "}
      <p>
        <span className="font-bold">Opened: </span>
        {opened}
      </p>
    </FlexBox>
  );
};

export default EmailDate;
