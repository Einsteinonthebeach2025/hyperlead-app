"use client"
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FaStar, FaChartLine, FaDatabase, FaInbox, FaUnlockAlt } from "react-icons/fa";
import { FaRegFolderClosed } from "react-icons/fa6";
import { PiShootingStarFill } from "react-icons/pi";
import { BsPersonAdd } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setError } from "app/features/modalSlice";
import { selectUser } from "app/features/userSlice";
import SideBarLinks from "app/components/SideBarLinks";
import ToggleDashboardData from "./ToggleDashboardData";
import AddExtraLeads from "./extraLeads/AddExtraLeads";
import Button from "app/components/buttons/Button";

const links = [
  {
    href: "/dashboard/activities",
    label: "Activities",
    icon: <FaChartLine />,
  },
  {
    href: "/dashboard/leads",
    label: "Lead Dashboard",
    icon: <FaDatabase />,
  },
  {
    href: "/dashboard/history-leads",
    label: "Archived Leads",
    icon: <FaRegFolderClosed />,
  },
  {
    href: "/dashboard/unlocked-leads",
    label: "unlocked Leads",
    icon: <FaUnlockAlt />,
  },
  {
    href: "/dashboard/favorite-leads",
    label: "Saved Leads",
    icon: <FaStar />,
  },
  {
    href: "/dashboard/emails",
    label: "Inbox",
    icon: <FaInbox />,
  },
  {
    href: "/dashboard/email-sequence",
    label: "Campaigns",
    icon: <PiShootingStarFill />,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: <IoMdNotifications />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <IoMdSettings />,
  },
];

const DashboardSide = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleAddTeammateClick = (e) => {
    e.preventDefault();
    const subscription = user?.profile?.subscription;
    if (!subscription || subscription === "PLUS") {
      dispatch(setError({ message: "Subscribe to PRO or Hyper plan for this feature." }));
      return;
    }
    router.push("/add-assistant");
  };

  return (
    <SideBarLinks links={links}>
      <div className="flex flex-col items-start space-y-2 justify-between w-full">
        <ToggleDashboardData />
        <AddExtraLeads />
        <Button
          type="extra"
          className="w-full center"
          onClick={handleAddTeammateClick}
        >
          <BsPersonAdd />
          <span> Add Teammate</span>
        </Button>
      </div>
    </SideBarLinks>
  );
};

export default DashboardSide;
