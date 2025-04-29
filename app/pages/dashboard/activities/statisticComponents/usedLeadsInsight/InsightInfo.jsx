const InsightInfo = ({ data = [] }) => {
  return (
    <div className=" absolute inset-0 center flex-col">
      {data ? (
        <>
          {data?.map((item, index) => {
            return (
              <div
                className="flex items-center gap-2 font-semilight"
                key={index}
              >
                <h1>{item.title}</h1>
                <h1 style={{ color: item.color }}>{item.value}</h1>
              </div>
            );
          })}
        </>
      ) : (
        <h1>u have to subscribe</h1>
      )}
    </div>
  );
};

export default InsightInfo;
