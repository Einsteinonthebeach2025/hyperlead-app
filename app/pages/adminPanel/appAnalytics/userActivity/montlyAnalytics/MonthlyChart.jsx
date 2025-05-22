"use client"
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import HoverModal from "app/components/modals/HoverModal";
import SpanText from "app/components/SpanText";


// Static data for visualization
const staticMonthlyData = [
  { month: 'Jan', users: 12 },
  { month: 'Feb', users: 30 },
  { month: 'Mar', users: 18 },
  { month: 'Apr', users: 25 },
  { month: 'May', users: 40 },
  { month: 'Jun', users: 10 },
  { month: 'Jul', users: 32 },
  { month: 'Aug', users: 22 },
  { month: 'Sep', users: 15 },
  { month: 'Oct', users: 38 },
  { month: 'Nov', users: 28 },
  { month: 'Dec', users: 20 },
];

const MonthlyChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = staticMonthlyData;
  const maxUsers = Math.max(...data.map(m => m.users), 1);
  const chartHeight = 200;
  const minBarHeight = 8;

  return (
    <div className="flex items-end h-64 w-full relative" style={{ minHeight: 200 }}>
      {data.map((m, i) => {
        const barHeight = m.users > 0
          ? Math.max((m.users / maxUsers) * (chartHeight - minBarHeight) + minBarHeight, minBarHeight)
          : 0;
        return (
          <div key={m.month} className="flex-1 flex flex-col items-center relative">
            <motion.div
              className="w-6 bg-blue-500 rounded-t-md cursor-pointer mb-1"
              initial={{ height: 0 }}
              animate={{ height: barHeight }}
              transition={{ duration: 0.7, delay: i * 0.05, type: 'spring' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <SpanText>{m.month}</SpanText>
            {hoveredIndex === i && (
              <HoverModal
                isOpen={true}
                text={`${m.users}`}
                className="left-5 w-full"
                style={{ bottom: `${barHeight + 10}px` }}
              >
                <FaUsers size={15} />
              </HoverModal>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MonthlyChart