import { IoMdCheckmark } from "react-icons/io";

const Benefits = ({ item }) => {
  if (!item || !item.benefits) {
    return null;
  }

  return (
    <div>
      {item.benefits?.map((benefit, index) => (
        <div
          className="flex items-center space-x-3 pl-3 my-2 md:my-4"
          key={index}
        >
          <IoMdCheckmark className="text-green-500" size={20} />
          <span className="text-sm md:text-base">{benefit}</span>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
