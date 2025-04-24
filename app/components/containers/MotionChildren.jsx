"use client";
import {
  fadeIn,
  slideBottom,
  slideLeft,
  slideTop,
  zoomOut,
} from "app/animationValues/motionVariants";
import { motion } from "framer-motion";

const MotionChildren = ({ animation, children, className, onClick }) => {
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
      default:
        return fadeIn;
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={className}
      variants={getVariant(animation)}
    >
      {children}
    </motion.div>
  );
};

export default MotionChildren;
