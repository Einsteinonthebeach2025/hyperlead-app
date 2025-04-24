"use client";
import { motion } from "framer-motion";
import {
  fadeIn,
  infinityScroll,
  slideBottom,
  slideLeft,
  slideTop,
  zoomOut,
} from "app/animationValues/motionVariants";

const MotionContainer = ({ children, className, animation, type, onClick }) => {
  const getVariant = (animation) => {
    switch (animation) {
      case "left":
        return slideLeft;
      case "fade-in":
        return fadeIn;
      case "zoom-out":
        return zoomOut;
      case "bottom":
        return slideBottom;
      case "top":
        return slideTop;
      case "infinity-scroll":
        return infinityScroll;
      default:
        return fadeIn;
    }
  };

  return (
    <motion.div
      initial="hidden"
      {...(type === "in-view"
        ? { whileInView: "visible" }
        : { animate: "visible" })}
      exit="exit"
      className={className}
      onClick={onClick}
      variants={getVariant(animation)}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default MotionContainer;
