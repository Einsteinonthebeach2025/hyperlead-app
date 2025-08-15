"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { setError } from "app/features/modalSlice";
import { zoomOut } from "app/animationValues/motionVariants";
import Link from "next/link";

const ErrorMsg = () => {
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state?.modal?.error || "");
  const type = useSelector((state) => state?.modal?.type || "");
  const link = useSelector((state) => state?.modal?.link || "");
  const title = useSelector((state) => state?.modal?.title || "");
  const [count, setCount] = useState(5);

  useEffect(() => {
    let interval;
    if (error) {
      setCount(5);
      interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else {
      setCount(5);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [error]);

  useEffect(() => {
    if (count === 0 && error) {
      dispatch(setError(""));
    }
  }, [count, error, dispatch]);

  const handleClose = () => {
    dispatch(setError(""));
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
          className={`${type === "success"
            ? "border-green-500 bg-green-200 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
            : "border-red-500 bg-red-200 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
            } px-4 md:px-8 border-3 fixed z-[32] top-5 right-5 py-3 rounded-lg font-semibold flex gap-3 items-center `}
        >
          <span className={`absolute -right-3 -bottom-3 ${type === "success" ? "bg-green-500" : "bg-red-500"} w-5 h-5 text-white center rounded-md`}>{count}</span>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMsg;
