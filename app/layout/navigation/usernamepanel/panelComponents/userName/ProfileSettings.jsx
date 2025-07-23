"use client";
import { AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "app/lib/actions/authActions";
import { clearUser, selectUser } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import MotionContainer from "app/components/containers/MotionContainer";
import Button from "app/components/buttons/Button";
import CardContainer from "app/components/containers/CardContainer";
import { FaChartLine } from "react-icons/fa6";
import { IoMdOptions } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";

const ProfileSettings = ({ isOpen, handleActive }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleSignOut = async (e) => {
    e?.preventDefault();
    try {
      const { error } = await signOut();
      if (error) {
        dispatch(setError(error));
        return;
      }
      dispatch(clearUser());
      router.push("/");
      handleActive?.();
    } catch (error) {
      dispatch(setError("Failed to sign out. Please try again."));
    }
  };

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (item.name === "Add Teammate") {
      const subscription = user?.profile?.subscription;
      if (!subscription || subscription === "PLUS") {
        dispatch(setError({ message: "Subscribe to PRO or HYPER plan for this feature." }));
        return;
      }
    }
    if (item.isLogout) {
      handleSignOut(e);
      return;
    }
    handleActive?.();
    router.push(item.href);
  };



  const links = [
    {
      name: "My profile",
      href: "/myprofile",
      icon: <FaUserEdit />,
      type: "link",
    },
    {
      name: "Dashboard",
      icon: <FaChartLine />,
      href: "/dashboard/activities",
      type: "link",
    },
    {
      name: "Lead Regions",
      href: "/regions",
      icon: <FaMapMarkedAlt />,
      type: "link",
    },

    {
      name: "Intustry Preferences",
      href: "/preferences",
      icon: <IoMdOptions />,
      type: "link",
    },

    {
      name: "Add Teammate",
      href: "/add-assistant",
      icon: <BsPersonFillAdd />,
      type: "link",
    },
    {
      name: "Logout",
      href: "/",
      icon: <MdLogout />,
      isLogout: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="bottom" onMouseLeave={handleActive}>
          <CardContainer

            className="absolute z-10 top-14 right-0 w-52 space-y-1 border shadow-md dark:shadow-stone-700 *:flex *:justify-end"
          >
            {links.map((item, index) => (
              <div key={index}>
                <Button
                  onClick={(e) => handleLinkClick(e, item)}
                  type={item.type}
                  href={
                    item.name === "Add Teammate" && (!user?.profile?.subscription || user?.profile?.subscription === "PLUS")
                      ? undefined
                      : item.href
                  }
                >
                  <span>{item.name}</span>
                  {item.icon}
                </Button>
              </div>
            ))}
          </CardContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettings;
