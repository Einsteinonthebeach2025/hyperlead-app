"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import MotionContainer from "app/components/containers/MotionContainer";
import NavLinks from "../nav/NavLinks";
import RegistrationButtons from "app/components/buttons/RegistrationButtons";
const SideBar = () => {
  const { isOpen } = useSelector((store) => store?.modal || {});
  const user = useSelector(selectUser);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="left"
          className="fixed z-10 top-14 inset-0 backdrop-blur-xl md:hidden flex items-center justify-center flex-col space-y-10"
        >
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
