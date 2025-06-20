"use client";
import Link from "next/link";
import FlexBox from "../containers/FlexBox";
import Spinner from "../Spinner";
import { IoIosArrowBack } from "react-icons/io";

const Button = ({
  children,
  onClick,
  className,
  icon,
  type,
  loading,
  href,
}) => {
  const cardTypes = (type) => {
    switch (type) {
      case "light":
        return "light-style px-4 py-1 lg:py-2 md:text-sm";
      case "extra":
        return "bg-green-300/50 hover:bg-green-300 dark:bg-green-400 px-3 py-1 space-x-1 rounded-lg border border-green-500";
      case "blue":
        return "blue-style text-sm border px-4 py-1 lg:py-2 md:text-sm";
      case "link":
        return "text-neutral-600 hover:text-black dark:text-stone-200 dark:hover:text-stone-400 md:text-sm";
      case "delete":
        return "border border-red-500 bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 px-2";
      case "success":
        return "text-green-500 bg-green-100 border border-green-500 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 px-2";
      case "compose":
        return "bg-neutral-900 dark:bg-[#344c63] hover:shadow-[0_0_10px_2px] hover:shadow-violet-500/60 hover:dark:shadow-amber-500/50 px-2 py-1 font-medium transition duration-200";
      default:
        return "black-style py-1 px-4 lg:py-2 md:text-sm md:text-sm";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${className} ${cardTypes(type)} text-[11px] [&_svg]:text-sm md:[&_svg]:text-lg cursor-pointer font-semibold flex items-center space-x-1 rounded-3xl capitalize duration-300 w-fit`}
    >
      <>
        {href ? (
          href === "back" ? (
            <FlexBox type="row" onClick={() => window.history.back()}>
              <IoIosArrowBack size={20} />
              <span>Back</span>
            </FlexBox>
          ) : (
            <Link href={href} className="flex items-center space-x-2">
              {icon && icon}
              {children}
            </Link>
          )
        ) : (
          <>
            {icon && icon}
            {children}
            {loading && <Spinner />}
          </>
        )}
      </>
    </button>
  );
};

export default Button;
