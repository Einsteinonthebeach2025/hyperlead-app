const GradientContainer = ({ type }) => {
  const getGradientColors = (type) => {
    switch (type) {
      case "sky":
        return "from-sky-100 from-30% to-transparent bg-radial";
      default:
        return "bg-radial-[at_5%_25%] from-amber-100/60 via-sky-100/30 to-violet-100";
    }
  };

  return (
    <div
      className={`absolute inset-0 -z-1 h-full ${getGradientColors(type)}`}
    />
  );
};

export default GradientContainer;
