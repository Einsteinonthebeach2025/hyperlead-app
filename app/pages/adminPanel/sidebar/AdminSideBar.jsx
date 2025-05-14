import SideBarLinks from "app/components/SideBarLinks";
import { MdDashboard, MdLeaderboard } from "react-icons/md";

const links = [
  {
    href: "/administration/reported-bugs",
    label: "Reported bugs",
    icon: <MdDashboard />,
  },
  {
    href: "/administration/hyperlead-users",
    label: "hyperlead users",
    icon: <MdLeaderboard />,
  },
];

const AdminSideBar = () => {
  return (
    <div className="w-[15%] *:w-full space-y-3 px-3 py-5">
      <SideBarLinks links={links} />
    </div>
  )
}

export default AdminSideBar