import CardContainer from "app/components/containers/CardContainer";
import DonutAnimation from "./DonutAnimation";
import InsightInfo from "./InsightInfo";

const UsedLeadsInsight = ({ data = {} }) => {
  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];
  const used = data?.used_stats?.used;
  const unused = data?.used_stats?.unused;
  const total = used + unused;

  const activities = [
    {
      title: "My total leads",
      value: total,
      color: COLORS[1],
      width: 10,
    },
    {
      title: "Leads Used",
      value: used,
      color: COLORS[2],
      width: 9,
    },
    {
      title: "Remaining leads",
      value: unused,
      color: COLORS[0],
      width: 8,
    },
  ];

  return (
    <CardContainer className="relative h-auto w-auto">
      <InsightInfo data={activities} />
      <DonutAnimation data={activities} />
    </CardContainer>
  );
};

export default UsedLeadsInsight;
