const InsightInfo = ({ data = {} }) => {
  return (
    <div className="absolute inset-0 center flex-col">
      {data?.map((item, index) => {
        return (
          <div className="flex items-center gap-2 font-semilight" key={index}>
            <h1 className="font-thin dark:text-white">{item.title}</h1>
            <h1 className=" font-bold dark:text-blue-800">{item.value}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default InsightInfo;
