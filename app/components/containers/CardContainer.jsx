const CardContainer = ({ children, className, onClick, onMouseleave, onMouseEnter }) => {

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseleave}
      className={`${className} p-3 lg:p-5 border rounded-xl duration-300 group *:duration-300 bg-neutral-100 border-neutral-300 dark:bg-[#1d2939] dark:border-[#344c63]`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
