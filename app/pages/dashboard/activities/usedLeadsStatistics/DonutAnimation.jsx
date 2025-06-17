"use client";
import { selectIsDarkMode } from "app/features/modalSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const DonutAnimation = ({ data }) => {
  const isDarkMode = useSelector(selectIsDarkMode)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const totalValue = data?.reduce((acc, cur) => acc + cur.value, 0);
  let accumulatedOffset = 0;

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {data?.map((activity, index) => {
        const percentage = totalValue ? activity.value / totalValue : 0;
        const strokeLength = percentage * circumference;
        const strokeDasharray = `${strokeLength} ${circumference}`;
        const strokeDashoffset = -accumulatedOffset;
        accumulatedOffset += strokeLength;

        return (
          <motion.circle
            className={activity.OPACITY}
            key={index}
            cx="50"
            cy="50"
            r={radius}
            stroke={isDarkMode ? '#175fd4' : '#3b82f6'}
            strokeWidth={activity.width}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset.toString()}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          />
        );
      })}
    </svg>
  );
};

export default DonutAnimation;
