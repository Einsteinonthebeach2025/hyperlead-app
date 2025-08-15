const SpanContainer = ({ children, className, onClick, }) => {


  return (
    <div
      onClick={onClick}
      className={`${className} border flex items-center text-center justify-center rounded-full px-3 text-[12px] capitalize blue-style cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default SpanContainer;
