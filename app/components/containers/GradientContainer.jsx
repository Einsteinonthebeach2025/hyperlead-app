const GradientContainer = ({ type }) => {
  const getGradientColors = (type) => {
    switch (type) {
      case "sky":
        return "bg-radial from-sky-100 from-1% to-90% dark:from-blue-400/30 dark:from-1% dark:to-65% dark:z-0";
      default:
        return "bg-radial-[at_5%_25%] from-amber-100/60 via-sky-100/30 to-violet-100 dark:bg-none";
    }
  };

  return (
    <div
      className={`absolute inset-0 -z-[1] h-full ${getGradientColors(type)}`}
    />
  );
};

export default GradientContainer;
