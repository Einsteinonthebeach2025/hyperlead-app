import { IoMdClose } from "react-icons/io";

const Close = ({ onClick, className, type }) => {
  const getButton = (type) => {
    switch (type) {
      case "light":
        return "text-neutral-200 hover:text-white";
      default:
        return "text-neutral-600 hover:text-black";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${className} ${getButton(type)} cursor-pointer duration-300`}
    >
      <IoMdClose size={25} />
    </div>
  );
};

export default Close;
