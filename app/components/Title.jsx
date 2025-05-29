const Title = ({ children, className }) => {
  return <h2 className={`${className} font-semibold text-2xl text-black dark:text-stone-100`}>{children}</h2>;
};

export default Title;
