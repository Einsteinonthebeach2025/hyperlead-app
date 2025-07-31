const InsightInfo = ({ data = {} }) => {
  return (
    <div className="absolute inset-0 center flex-col h-full">
      {data?.map((item, index) => {
        return (
          <div className="flex items-center gap-2 font-semilight h-6" key={index}>
            <h1 className="font-thin dark:text-white">{item.title}</h1>
            <h1 className="font-bold dark:text-blue-500">{item.value}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default InsightInfo;
