const SubTitle = ({ children, className }) => {
  return (
    <h1
      className={`text-[13px] md:text-base capitalize font-semibold ${className}`}
    >
      {children}
    </h1>
  );
};

export default SubTitle;
