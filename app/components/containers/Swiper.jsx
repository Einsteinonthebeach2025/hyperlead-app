"use client";
import { slideShow } from "@/animationValues/motionVariants";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Swiper = ({ children, className, items }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex items-center md:hidden w-full ${className}`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={slideShow}
          initial="hidden"
          animate="visible"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
          className="absolute w-full"
        >
          {children[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Swiper;
