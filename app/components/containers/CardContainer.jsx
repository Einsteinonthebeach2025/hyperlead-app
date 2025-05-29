const CardContainer = ({ children, className, onClick, onMouseleave }) => {

  return (
    <div
      onClick={onClick}
      onMouseLeave={onMouseleave}
      className={`${className} p-5 border rounded-xl duration-300 group *:duration-300 bg-stone-100 border-stone-200 dark:bg-[#1d2939] dark:border-[#344c63] `}
    >
      {children}
    </div>
  );
};

export default CardContainer;
