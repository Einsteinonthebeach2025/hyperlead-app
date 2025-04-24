import DonutAnimation from "./DonutAnimation";
import InsightInfo from "./InsightInfo";

const UsedLeadsInsight = ({ data = {} }) => {
  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];

  const activities = [
    {
      title: "My total leads",
      value: data?.monthly_leads,
      color: COLORS[1],
      width: 10,
    },
    {
      title: "Leads Used",
      value: data?.used_stats?.used,
      color: COLORS[2],
      width: 9,
    },
    {
      title: "Remaining leads",
      value: data?.used_stats?.unused,
      color: COLORS[0],
      width: 8,
    },
  ];

  return (
    <div className="relative grid grid-cols-4 gap-4">
      <div className="relative">
        <InsightInfo data={activities} />
        <DonutAnimation data={activities} />
      </div>
    </div>
  );
};

export default UsedLeadsInsight;

// <section className="px-4 py-8 w-[50%] space-y-5">
//   <Title>Statistics</Title>
//   <div className="space-y-4">
//     {activities.map((item, i) => {
//       const percentage = ((item.value / maxValue) * 100).toFixed(1);
//       return (
//         <div key={i}>
//           <SubTitle>{item.title}</SubTitle>
//           <div className="w-full bg-neutral-800 rounded-md h-6 overflow-hidden relative">
//             <motion.div
//               initial={{ width: 0 }}
//               viewport={{ once: true }}
//               animate={{ width: `${percentage}%` }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="h-full bg-blue-500 rounded-md"
//             />
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-mono">
//               {item.value}
//             </span>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </section>
