"use client";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "app/features/modalSlice";

const SideButton = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleSideBar = () => {
    dispatch(setToggle(!isOpen));
  };

  return (
    <div
      className="cursor-pointer relative z-10 space-y-[10px] block md:hidden"
      onClick={handleSideBar}
    >
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      ></div>
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></div>
    </div>
  );
};

export default SideButton;
