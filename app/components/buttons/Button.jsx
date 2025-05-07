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
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        type === "light"
          ? "light-style border py-1 lg:py-2"
          : type === "blue"
            ? "blue-style text-sm border py-1 lg:py-2"
            : type === "link"
              ? "text-neutral-600 hover:text-black"
              : "black-style py-1 lg:py-2"
      } text-[11px] px-4 md:text-sm [&_svg]:text-sm md:[&_svg]:text-lg cursor-pointer font-semibold flex items-center space-x-1 rounded-3xl capitalize duration-300`}
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
