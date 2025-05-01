const Paragraph = ({ children, className }) => {
  return (
    <p className={`${className} text-[11px] lg:text-sm text-neutral-500`}>
      {children}
    </p>
  );
};

export default Paragraph;
