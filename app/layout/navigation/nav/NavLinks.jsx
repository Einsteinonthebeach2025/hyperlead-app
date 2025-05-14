"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "app/features/modalSlice";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import { selectUser } from "app/features/userSlice";

const navLinks = [
  {
    id: 0,
    name: "features",
    link: "/",
  },
  {
    id: 1,
    name: "administration",
    link: "/administration/reported-bugs",
    isAdmin: true,
  },
];

const NavLinks = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const filteredLinks = navLinks.filter((item) => {
    if (item.isAdmin) {
      return user?.profile?.is_admin;
    }
    return true;
  });

  const handleClose = () => {
    dispatch(setToggle(false));
  };
  return (
    <MotionContainer
      animation="zoom-out"
      className="flex flex-col items-center md:space-x-4 md:flex-row "
    >
      {filteredLinks?.map((item) => {
        return (
          <MotionChildren
            animation="zoom-out"
            onClick={handleClose}
            key={item.id}
          >
            <Link className="text-3xl md:text-sm" href={item.link}>
              {item.name}
            </Link>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default NavLinks;
