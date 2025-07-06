import Logo from "app/components/Logo";
import NavLinks from "./NavLinks";
import UserPanel from "../usernamepanel/UserPanel";
import LogoIcon from "app/components/LogoIcon";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="sticky w-full z-10 top-0 backdrop-blur-md px-3 py-3 lg:px-20 flex justify-between items-center">
      <div className="block md:hidden">
        <Link href='/'>
          <LogoIcon />
        </Link>
      </div>
      <div className="center hidden md:flex md:space-x-6 absolute inset-0 md:relative">
        <Logo />
        <NavLinks />
      </div>
      <UserPanel />
    </nav>
  );
};

export default Navigation;
