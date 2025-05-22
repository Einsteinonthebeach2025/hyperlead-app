import SideBarLinks from "app/components/SideBarLinks";
import { MdFeedback } from "react-icons/md";
import { FaUsersCog, FaBug } from "react-icons/fa";

const links = [
  {
    href: "/administration/analytics",
    label: "App analytics",
    icon: <FaUsersCog />,
  },
  {
    href: "/administration/reported-bugs",
    label: "Reported bugs",
    icon: <FaBug />,
  },
  {
    href: "/administration/reported-feedbacks",
    label: "Feedbacks",
    icon: <MdFeedback />,
  },
  {
    href: "/administration/hyperlead-users",
    label: "User management",
    icon: <FaUsersCog />,
  },

];

const AdminSideBar = () => {
  return (
    <SideBarLinks links={links} />
  )
}

export default AdminSideBar