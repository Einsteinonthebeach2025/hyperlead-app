"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { setToggle } from "app/features/modalSlice";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";

const navLinks = [
  {
    id: 0,
    name: "Pricing",
    link: "#pricing",
  },
  {
    id: 1,
    name: "administration",
    link: "/administration/hyperlead-users",
    isAdmin: true,
  },
  {
    id: 3,
    name: "Features",
    link: "#features",
  },
];

const NavLinks = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const filteredLinks = navLinks.filter((item) => {
    if (item.isAdmin) {
      return user?.profile?.is_admin;
    }
    return true;
  });

  const handleClose = () => {
    dispatch(setToggle(false));
  };

  const handlePricingClick = (e) => {
    e.preventDefault();
    handleClose();
    if (pathname === "/") {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#pricing");
    }
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    handleClose();
    if (pathname === "/") {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#features");
    }
  };

  return (
    <MotionContainer
      animation="zoom-out"
      className="flex flex-col items-center md:space-x-4 md:flex-row "
    >
      {filteredLinks?.map((item) => {
        if (item.name === "Pricing") {
          return (
            <MotionChildren
              animation="zoom-out"
              onClick={handlePricingClick}
              key={item.id}
            >
              <button className="text-3xl md:text-sm dark:text-stone-300 cursor-pointer">
                {item.name}
              </button>
            </MotionChildren>
          );
        }
        if (item.name === "Features") {
          return (
            <MotionChildren
              animation="zoom-out"
              onClick={handleFeaturesClick}
              key={item.id}
            >
              <button className="text-3xl md:text-sm dark:text-stone-300 cursor-pointer">
                {item.name}
              </button>
            </MotionChildren>
          );
        }

        return (
          <MotionChildren
            animation="zoom-out"
            onClick={handleClose}
            key={item.id}
          >
            <Link className="text-3xl md:text-sm dark:text-stone-300" href={item.link}>
              {item.name}
            </Link>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default NavLinks;
