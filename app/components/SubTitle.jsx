const SubTitle = ({ children, className }) => {
  return (
    <h1
      className={`text-[13px] md:text-base capitalize font-semibold text-black dark:text-stone-100 ${className}`}
    >
      {children}
    </h1>
  );
};

export default SubTitle;
