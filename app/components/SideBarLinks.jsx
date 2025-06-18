"use client";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinks = ({ links, children }) => {
  const pathname = usePathname();

  return (

    <div className="w-full md:w-[30%] lg:w-[20%] relative py-5 lg:border-r border-neutral-200 dark:border-[#344c63]">
      <div className="sticky top-20 w-full px-3 flex flex-col justify-between lg:h-screen">
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
                  className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-300 capitalize relative ${isActive
                    ? "bg-neutral-800 text-white dark:bg-blue-900 dark:hover:bg-indigo-900/70"
                    : "text-neutral-600 bg-neutral-200 hover:bg-neutral-500/20 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-stone-200"
                    }`}
                >
                  <span>{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </MotionChildren>
            );
          })}
        </MotionContainer>
        <div className="center py-2 lg:mb-24"> {children}</div>
      </div>
    </div>

  );
};

export default SideBarLinks;
