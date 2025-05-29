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
import Button from "app/components/buttons/Button";
import CardContainer from "app/components/containers/CardContainer";

const ProfileSettings = ({ isOpen, handleActive }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async (e) => {
    e?.preventDefault();
    console.log("first log");
    try {
      const { error } = await signOut();
      if (error) {
        console.log("error");
        dispatch(setError(error));
        return;
      }
      console.log("logged out");
      dispatch(clearUser());
      router.push("/");
      if (handleActive) {
        handleActive();
      }
    } catch (error) {
      console.error("Sign out error:", error);
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
      name: "Regions",
      href: "/regions",
      icon: <MdBusinessCenter />,
      type: "link",
    },
    {
      name: "Logout",
      href: "/",
      icon: <IoIosLogOut />,
      isLogout: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="bottom">
          <CardContainer onMouseleave={handleActive} className="absolute z-10 top-14 right-0 w-44 space-y-1 border shadow-md dark:shadow-stone-700 *:flex *:justify-end">
            {links?.map((item, index) => {
              return (
                <div key={index}>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isLogout) {
                        handleSignOut(e);
                      } else if (handleActive) {
                        handleActive();
                      }
                    }}
                    type={item.type}
                    href={item.href}
                  >
                    <span>{item.name}</span>
                    {item.icon}
                  </Button>
                </div>
              );
            })}
          </CardContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettings;
