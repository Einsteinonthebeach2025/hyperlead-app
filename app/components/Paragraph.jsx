const Paragraph = ({ children, className }) => {
  return (
    <p className={`${className} text-[11px] lg:text-sm text-stone-500 dark:text-stone-300`}>
      {children}
    </p>
  );
};

export default Paragraph;
