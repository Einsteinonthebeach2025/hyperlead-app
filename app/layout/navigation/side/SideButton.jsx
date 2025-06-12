"use client";
import { selectSideBar, toggleSideBar } from "app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const SideButton = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(selectSideBar);

  const handleSideBar = () => {
    dispatch(toggleSideBar());
  };

  return (
    <div
      className="cursor-pointer relative z-10 space-y-[10px] block md:hidden"
      onClick={handleSideBar}
    >
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${sidebar ? "rotate-45 translate-y-1.5" : ""
          }`}
      ></div>
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${sidebar ? "-rotate-45 -translate-y-1.5" : ""
          }`}
      ></div>
    </div>
  );
};

export default SideButton;
