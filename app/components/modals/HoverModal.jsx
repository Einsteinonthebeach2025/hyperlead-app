"use client";
import { AnimatePresence } from "framer-motion";
import MotionContainer from "../containers/MotionContainer";

const HoverModal = ({ isOpen, text, className, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="zoom-out"
          className={`rounded-md px-2 py-1 absolute flex items-center gap-2 shadow-[4px_4px_5px_0px_#909090] text-white w-fit text-[10px] font-bold  bg-neutral-700 z-10 ${className}`}
        >
          <span>{text}</span>
          {children}
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default HoverModal;
