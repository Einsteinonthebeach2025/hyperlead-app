import Spinner from "../Spinner";

const AiButton = ({ children, text, onClick, loading }) => {


  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl text-white z-[2] group bg-neutral-900 ai-button-glow cursor-pointer"
    >
      <div className="bg-black/80 flex items-center capitalize space-x-1 rounded-2xl px-3 py-1 [&_svg]:text-teal-400">
        <span className="ai-style font-bold">{text}</span>
        {children}
        {loading && <Spinner />}
      </div>
    </button>
  );
};

export default AiButton;
