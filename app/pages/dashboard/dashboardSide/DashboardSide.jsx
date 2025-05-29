import SideBarLinks from "app/components/SideBarLinks";
import SimulateExpire from "app/SimulateExpire";
import { MdDashboard, MdLeaderboard, MdEmail, MdOutlineSecurity } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

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
      <SimulateExpire />
    </SideBarLinks>

  );
};



export default DashboardSide;
