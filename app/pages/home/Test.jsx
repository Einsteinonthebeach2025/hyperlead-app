import AiButton from "app/components/buttons/AiButton";
import { FaHome } from "react-icons/fa";


const Test = () => {


  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 gap-4 bg-neutral-900 text-white">
      <AiButton text="AI button style">
        <FaHome className="text-white" />
      </AiButton>


      <div>
        <h1 className="border-bottom">Hello world from georgia</h1>
      </div>
    </div>
  );
};

export default Test;
