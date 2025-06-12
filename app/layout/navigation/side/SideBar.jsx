"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { selectSideBar } from "app/features/modalSlice";
import MotionContainer from "app/components/containers/MotionContainer";
import NavLinks from "../nav/NavLinks";
import RegistrationButtons from "app/components/buttons/RegistrationButtons";

const SideBar = () => {
  const sidebar = useSelector(selectSideBar);
  const user = useSelector(selectUser);

  return (
    <AnimatePresence>
      {sidebar && (
        <MotionContainer
          animation="left"
          className="fixed z-20 top-14 inset-0 backdrop-blur-xl md:hidden flex items-center justify-center flex-col space-y-10"
        >
          <h1>hello world</h1>
          <NavLinks />
          {user ? (
            ""
          ) : (
            <div className="block md:hidden">
              <RegistrationButtons />
            </div>
          )}
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
