const IconContainer = ({ children, text, size, href, className, color, onClick }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-4xl",
  };

  const colorClasses = {
    violet: "text-violet-500 dark:text-violet-800 bg-violet-200 hover:bg-violet-300 dark:bg-violet-400 hover:dark:bg-violet-500",
    green: "text-green-500 dark:text-green-800 bg-green-200 hover:bg-green-300 dark:bg-green-400 hover:dark:bg-green-500",
    blue: "text-blue-500 dark:text-blue-800 bg-blue-200 hover:bg-blue-300 dark:bg-blue-400 hover:dark:bg-blue-500",
  };

  const containerSize = sizeClasses[size] || sizeClasses.lg;
  const containerColor = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`${containerSize} ${containerColor} ${className} rounded-full duration-300 flex items-center justify-center`}
      onClick={onClick}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
      {children}
    </div>
  );
};

export default IconContainer;
