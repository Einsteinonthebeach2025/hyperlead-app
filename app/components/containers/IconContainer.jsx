const IconContainer = ({ children, size, href, color = "blue", className }) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "blue-style",
    green: "green-style",
    light: "light-style",
    gold: "gold-style",
  };

  const containerSize = sizeClasses[size] || sizeClasses.lg;
  const containerColor = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`${containerSize} ${containerColor} ${className} rounded-full duration-300 flex items-center justify-center`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    </div>
  );
};

export default IconContainer;
