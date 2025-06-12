const IconContainer = ({ children, size, href, className }) => {
  const sizeClasses = {
    sm: "md:w-10 w-8 md:h-10 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const containerSize = sizeClasses[size] || sizeClasses.lg;

  return (
    <div
      className={`${containerSize} ${className} blue-style rounded-full duration-300 flex items-center justify-center`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    </div>
  );
};

export default IconContainer;
