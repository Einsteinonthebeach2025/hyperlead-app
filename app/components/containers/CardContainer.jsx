const CardContainer = ({ children, className, onClick, type = "light" }) => {
  const cardTypes = (type) => {
    switch (type) {
      case "light":
        return "light-gradient border-neutral-200 hover:border-neutral-400";
      case "blue":
        return "blue-gradient border-blue-200/70 hover:border-blue-500";
      case "green":
        return "green-gradient border-green-200/70 hover:border-green-500";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${className} ${cardTypes(
        type
      )} p-5 border rounded-xl duration-300 group *:duration-300 `}
    >
      {children}
    </div>
  );
};

export default CardContainer;
