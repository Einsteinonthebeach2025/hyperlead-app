import SideBarLinks from "app/components/SideBarLinks";
import SimulateExpire from "app/SimulateExpire";
import { MdDashboard, MdLeaderboard, MdEmail } from "react-icons/md";

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

const DashboardSide = () => {
  return (
    <div className="w-full md:w-[30%] lg:w-[20%] relative py-5">
      <div className="sticky top-20 w-full px-5">
        <SideBarLinks links={links} />
        <div className="center py-2">
          <SimulateExpire />
        </div>
      </div>
    </div>
  );
};

export default DashboardSide;
