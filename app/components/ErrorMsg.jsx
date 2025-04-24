"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { setError } from "app/features/modalSlice";
import { zoomOut } from "app/animationValues/motionVariants";

const ErrorMsg = () => {
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const error = useSelector((state) => state?.modal?.error || "");
  const type = useSelector((state) => state?.modal?.type || "");
  const link = useSelector((state) => state?.modal?.link || "");
  const title = useSelector((state) => state?.modal?.title || "");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(""));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleClose = () => {
    dispatch(setError({ message: "", type: "", link: "", title: "" }));
  };

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          ref={toastRef}
          variants={zoomOut}
          exit="exit"
          initial="hidden"
          whileInView="visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${
            type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border-2 border-red-400 text-red-700"
          } px-4 md:px-8 fixed z-20 bottom-5 right-5 py-3 font-semibold flex flex-col items-center `}
        >
          <h1>{error}</h1>
          {link && (
            <Link
              onClick={handleClose}
              className="center mt-2 w-fit px-3 bg-red-600 text-white font-medium capitalize py-1 hover:bg-red-700 duration-300"
              href={link}
            >
              <span>{title}</span>
              <IoIosArrowForward />
            </Link>
          )}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: isHovered ? 0 : 5, ease: "linear" }}
            className={`absolute left-0 rounded-full -bottom-2 h-[2px] ${
              type === "success" ? "bg-green-500" : "bg-red-400"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMsg;
