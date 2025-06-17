import { selectIsDarkMode, toggleTheme } from "app/features/modalSlice";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const DarkModeIcon = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`border p-2 cursor-pointer rounded-full border-stone-300 dark:border-stone-600 transition-all duration-300 ${isDarkMode
        ? 'text-yellow-400 hover:text-yellow-600'
        : 'text-neutral-600 hover:text-neutral-900'
        }`}
    >
      {isDarkMode ? <IoSunnyOutline size={23} /> : <IoMoonOutline size={23} />}
    </button>
  );
};

export default DarkModeIcon;
