"use client";
import { motion } from "framer-motion";
import Title from "app/components/Title";
import CardContainer from "app/components/containers/CardContainer";

const EmailStats = ({ data = {} }) => {
  const donutData = [
    {
      title: "Total Emails Sent",
      value: data?.totalEmails || 0,
      color: "#f59e0b",
    },
    {
      title: "Opened",
      value: data?.openedEmails || 0,
      color: "#f59e0b",
    },
    {
      title: "Delivered",
      value: data?.deliveredEmails || 0,
      color: "#3b82f6",
    },
    {
      title: "Open Rate",
      value: data?.openRate || 0,
      color: "#3B82F6",
    },
    {
      title: "Delivery Rate",
      value: data?.deliveryRate || 0,
      color: "#22c55e",
    },
  ];

  const maxValue = Math.max(...donutData.map((item) => item.value));

  return (
    <CardContainer className="space-y-4">
      <Title>Email Statistics</Title>
      <div className="space-y-2">
        {donutData.map((item, i) => {
          const percentage = ((item.value / maxValue) * 100).toFixed(1);
          return (
            <div key={i}>
              <h1 className="font-normal text-[13px]">{item.title}</h1>
              <div className="w-full bg-neutral-200 rounded-md h-6 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  viewport={{ once: true }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full "
                  style={{ backgroundColor: item.color }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-xs font-mono">
                  {item.title.includes("Rate")
                    ? `${item.value.toFixed(1)}%`
                    : item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default EmailStats;
