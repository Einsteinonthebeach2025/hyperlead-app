"use client";
import { motion } from "framer-motion";
import Title from "app/components/Title";
import CardContainer from "app/components/containers/CardContainer";
import Paragraph from "app/components/Paragraph";
import ContentHeadline from "app/components/ContentHeadline";
import SpanText from "app/components/SpanText";

const EmailStats = ({ data = {} }) => {
  const donutData = [
    {
      title: "Total Emails Sent",
      value: data?.totalEmails || 0,
    },
    {
      title: "Opened",
      value: data?.openedEmails || 0,
    },
    {
      title: "Delivered",
      value: data?.deliveredEmails || 0,
    },
    {
      title: "Open Rate",
      value: data?.openRate || 0,
    },
    {
      title: "Delivery Rate",
      value: data?.deliveryRate || 0,
    },
  ];

  const maxValue = Math.max(...donutData.map((item) => item.value));

  return (
    <CardContainer className="space-y-4">
      <ContentHeadline
        className="border-bottom"
        type="column-start"
        title="Email & Campaign Performance"
        desc="Track how your emails are performing—sent, opened, and delivered.
Use built-in AI to generate high-converting messages faster."
      />
      <div className="space-y-2">
        {donutData.map((item, i) => {
          const percentage = ((item.value / maxValue) * 100).toFixed(1);
          return (
            <div key={i}>
              <SpanText className="font-medium">{item.title}</SpanText>
              <div className="w-full bg-neutral-300 dark:bg-neutral-700 rounded-md h-6 overflow-hidden relative mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  viewport={{ once: true }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-blue-500 dark:bg-blue-800"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium dark:text-stone-200">
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
