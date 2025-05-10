"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToggle } from "app/features/modalSlice";
import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";

const navLinks = [
  {
    id: 0,
    name: "features",
    link: "/",
  },
  {
    id: 1,
    name: "pricing",
    link: "/pricing",
  },
  {
    id: 2,
    name: "blog",
    link: "/blog",
  },
  {
    id: 3,
    name: "changelog",
    link: "/",
  },
];

const NavLinks = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setToggle(false));
  };
  return (
    <MotionContainer
      animation="zoom-out"
      className="flex flex-col items-center md:space-x-4 md:flex-row "
    >
      {navLinks?.map((item) => {
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
