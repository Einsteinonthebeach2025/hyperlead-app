import SideBarLinks from "app/components/SideBarLinks";
import SimulateExpire from "app/SimulateExpire";
import { MdDashboard, MdLeaderboard, MdEmail, MdOutlineSecurity, MdOutlineAttachEmail } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import ToggleDashboardData from "./ToggleDashboardData";

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
    href: "/dashboard/favorite-leads",
    label: "Favorite Leads",
    icon: <MdLeaderboard />,
  },
  {
    href: "/dashboard/emails",
    label: "Emails",
    icon: <MdEmail />,
  },
  {
    href: "/dashboard/email-sequence",
    label: "Email Sequences",
    icon: <MdOutlineAttachEmail />,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: <IoMdNotifications />,
  },
  {
    href: "/dashboard/security",
    label: "Account security",
    icon: <MdOutlineSecurity />,
  },
];

const DashboardSide = () => {
  return (
    <SideBarLinks links={links}>
      <div className="flex flex-col items-center justify-between w-full">
        {/* <SimulateExpire /> */}
        <ToggleDashboardData />
      </div>
    </SideBarLinks>

  );
};



export default DashboardSide;
