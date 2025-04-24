"use client";
import { AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard, MdBusinessCenter } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "app/lib/actions/authActions";
import { clearUser } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import MotionContainer from "app/components/containers/MotionContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import Button from "app/components/buttons/Button";

const ProfileSettings = ({ isOpen, handleActive }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        dispatch(setError(error));
        return;
      }
      dispatch(clearUser());
      router.push("/");
      if (handleActive) {
        handleActive();
      }
    } catch (error) {
      dispatch(setError("Failed to sign out. Please try again."));
    }
  };

  const links = [
    {
      name: "My profile",
      href: "/myprofile",
      icon: <FaUser />,
      type: "link",
    },
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      href: "/dashboard/activities",
      type: "link",
    },
    {
      name: "Preferences",
      href: "/preferences",
      icon: <MdBusinessCenter />,
      type: "link",
    },
    {
      name: "Logout",
      href: "/",
      icon: <IoIosLogOut />,
      type: "light",
      isLogout: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="bottom"
          className="absolute z-10 top-12 right-0 w-44 primary-border space-y-1 bg-white border shadow *:flex *:justify-end"
        >
          {links?.map((item, index) => {
            const onClick = item.isLogout
              ? handleSignOut
              : () => handleActive && handleActive();
            return (
              <MotionChildren key={index} animation="fade-in">
                <Button onClick={onClick} type={item.type} href={item.href}>
                  <span>{item.name}</span>
                  {item.icon}
                </Button>
              </MotionChildren>
            );
          })}
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettings;
