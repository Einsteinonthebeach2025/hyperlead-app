import Link from "next/link";
import LogoIcon from "./LogoIcon";

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-2xl dark:text-stone-300 relative z-[2] space-x-1 center items-center">
      <LogoIcon />
      <h1>
        HyperLead
      </h1>
    </Link>
  );
};

export default Logo;
