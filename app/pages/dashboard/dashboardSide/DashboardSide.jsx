"use client"
import { MdDashboard, MdLeaderboard, MdEmail, MdOutlineSecurity, MdOutlineAttachEmail, MdHistory } from "react-icons/md";
import { IoMdNotifications, IoMdAdd } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setError } from "app/features/modalSlice";
import { selectUser } from "app/features/userSlice";
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
    label: "Lead Dashboard",
    icon: <MdLeaderboard />,
  },
  {
    href: "/dashboard/history-leads",
    label: "Archived Leads",
    icon: <MdHistory />,
  },
  {
    href: "/dashboard/favorite-leads",
    label: "Saved Leads",
    icon: <FaStar />,
  },
  {
    href: "/dashboard/emails",
    label: "Inbox",
    icon: <MdEmail />,
  },
  {
    href: "/dashboard/email-sequence",
    label: "Campaigns",
    icon: <MdOutlineAttachEmail />,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: <IoMdNotifications />,
  },
  {
    href: "/dashboard/security",
    label: "Security",
    icon: <MdOutlineSecurity />,
  },
];

const DashboardSide = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleAddTeammateClick = (e) => {
    e.preventDefault();
    const subscription = user?.profile?.subscription;
    if (!subscription || subscription === "Plus") {
      dispatch(setError({ message: "Subscribe to PRO or Hyper plan for this feature." }));
      return;
    }
    router.push("/add-assistant");
  };

  return (
    <SideBarLinks links={links}>
      <div className="flex flex-col items-start space-y-2 justify-between w-full">
        <SimulateExpire />
        <ToggleDashboardData />
        <AddExtraLeads />
        <Button
          type="success"
          onClick={handleAddTeammateClick}
        >
          <span>Add Teammate</span>
          <IoMdAdd />
        </Button>
      </div>
    </SideBarLinks>
  );
};

export default DashboardSide;
