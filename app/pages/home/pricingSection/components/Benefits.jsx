import { IoMdCheckmark } from "react-icons/io";

const Benefits = ({ item }) => {
  if (!item || !item.benefits) {
    return null;
  }

  return (
    <div className="space-y-2 mt-5">
      {item.benefits?.map((benefit, index) => (
        <div className="space-x-2 flex items-center px-3" key={index}>
          <div>
            <IoMdCheckmark className="text-green-500" size={20} />
          </div>
          <div className="leading-0">
            <span className="text-sm text-neutral-700">{benefit}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
