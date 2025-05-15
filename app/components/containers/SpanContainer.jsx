const SpanContainer = ({ children, className, onClick, color = "light" }) => {
  const colorClasses = {
    blue: "blue-style",
    green: "green-style",
    light: "light-style",
    gold: "gold-style",
    purple: "purple-style",
    red: "red-style",
  };

  const containerColor = colorClasses[color] || colorClasses.light;

  return (
    <div
      onClick={onClick}
      className={`${containerColor} ${className} border text-center flex items-center justify-center rounded-full px-3 py-1 text-[12px] capitalize`}
    >
      <span className="pointer-events-none">
        {children}
      </span>
    </div>
  );
};

export default SpanContainer;
