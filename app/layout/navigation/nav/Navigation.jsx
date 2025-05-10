import Logo from "app/components/Logo";
import NavLinks from "./NavLinks";
import SideButton from "../side/SideButton";
import UserPanel from "../usernamepanel/UserPanel";

const Navigation = () => {
  return (
    <nav className="sticky w-full z-10 top-0 backdrop-blur-md px-3 py-3 lg:px-20 flex justify-between items-center">
      <SideButton />
      <div className="center md:space-x-6 absolute inset-0 md:relative">
        <Logo />
        <div className="hidden md:flex">
          <NavLinks />
        </div>
      </div>
      <UserPanel />
    </nav>
  );
};

export default Navigation;
