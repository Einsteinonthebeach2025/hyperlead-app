const SpanContainer = ({ children, className, onClick, color = "light" }) => {


  return (
    <div
      onClick={onClick}
      className={`${className} border flex items-center text-center justify-center rounded-full px-3 text-[12px] capitalize blue-style`}
    >
      {children}
    </div>
  );
};

export default SpanContainer;
