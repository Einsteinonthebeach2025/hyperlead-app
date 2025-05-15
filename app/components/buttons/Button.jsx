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
        return "light-style border px-4 py-1 lg:py-2 md:text-sm";
      case "blue":
        return "blue-style text-sm border px-4 py-1 lg:py-2 md:text-sm";
      case "link":
        return "text-neutral-600 hover:text-black md:text-sm";
      case "gold":
        return "gold-style text-sm px-4 border py-1 md:text-sm";
      case "link":
        return "text-neutral-600 hover:text-black md:text-sm";
      case "delete":
        return "border text-[10px] border-red-500 bg-red-100 text-red-500 hover:bg-red-200 px-2";
      case "success":
        return "text-green-500 text-[10px] bg-green-100 border border-green-500 hover:bg-green-200 px-2";
      default:
        return "black-style py-1 px-4 lg:py-2 md:text-sm md:text-sm";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${className} ${cardTypes(type)} text-[11px] [&_svg]:text-sm md:[&_svg]:text-lg cursor-pointer font-semibold flex items-center space-x-1 rounded-3xl capitalize duration-300`}
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
