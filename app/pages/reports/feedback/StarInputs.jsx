import SubTitle from "app/components/SubTitle";
import { FaStar } from "react-icons/fa";

const StarInputs = ({ setRating, setHover, hover, rating }) => {
  return (
    <div className="space-y-2">
      <SubTitle className="text-sm font-medium">Rating</SubTitle>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className="text-2xl cursor-pointer"
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar
                className={`${ratingValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                  }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarInputs;