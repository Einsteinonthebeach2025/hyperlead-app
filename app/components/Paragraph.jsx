const Paragraph = ({ children, className }) => {
  return (
    <p className={`${className} text-[12px] lg:text-base text-neutral-600`}>
      {children}
    </p>
  );
};

export default Paragraph;
