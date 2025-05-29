const Headline = ({ children, className }) => {
  return (
    <h1
      className={`${className} text-3xl md:text-5xl text-center lg:text-6xl font-bold tracking-tight capitalize dark:text-stone-100`}
    >
      {children}
    </h1>
  );
};

export default Headline;
