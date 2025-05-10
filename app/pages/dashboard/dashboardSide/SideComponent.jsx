"use client";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdLeaderboard, MdEmail } from "react-icons/md";

const SideComponent = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard/activities",
      label: "Activities",
      icon: <MdDashboard />,
    },
    {
      href: "/dashboard/leads",
      label: "My Leads",
      icon: <MdLeaderboard />,
    },
    {
      href: "/dashboard/emails",
      label: "Emails",
      icon: <MdEmail />,
    },
  ];

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
              className={`w-full center flex-row space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative ${
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

export default SideComponent;
