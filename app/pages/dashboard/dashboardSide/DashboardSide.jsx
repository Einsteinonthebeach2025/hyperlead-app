import { MdDashboard, MdLeaderboard, MdEmail, MdOutlineSecurity, MdOutlineAttachEmail, MdHistory } from "react-icons/md";
import { IoMdNotifications, IoMdAdd } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import SideBarLinks from "app/components/SideBarLinks";
import ToggleDashboardData from "./ToggleDashboardData";
import AddExtraLeads from "./extraLeads/AddExtraLeads";
import Button from "app/components/buttons/Button";
import SimulateExpire from "app/SimulateExpire";

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
    href: "/dashboard/history-leads",
    label: "Old Leads",
    icon: <MdHistory />,
  },
  {
    href: "/dashboard/favorite-leads",
    label: "Favorite Leads",
    icon: <FaStar />,
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
      <div className="flex flex-col items-start space-y-2 justify-between w-full">
        {/* <SimulateExpire /> */}
        <ToggleDashboardData />
        <AddExtraLeads />
        <Button type="success" href="/add-assistant">
          <span>Add Teammate</span>
          <IoMdAdd />
        </Button>
      </div>
    </SideBarLinks>
  );
};



export default DashboardSide;
