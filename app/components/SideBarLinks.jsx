"use client";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinks = ({links}) => {
  const pathname = usePathname();

  return (
    <MotionContainer
      animation="fade-in"
      className="w-full grid grid-cols-1 gap-2"
    >
      {links?.map((link) => {
        const isActive = pathname === link.href;
        return (
          <MotionChildren key={link.href} animation="fade-in">
            <Link
              href={link.href}
              className={`w-full center flex-row space-x-2 px-3 py-2 rounded-lg transition-all duration-300 capitalize relative ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-600 bg-neutral-200 hover:bg-neutral-500/20"
              }`}
            >
              <span>{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default SideBarLinks;
