import CardContainer from "app/components/containers/CardContainer";
import DonutAnimation from "./DonutAnimation";
import InsightInfo from "./InsightInfo";

const UsedLeadsInsight = ({ data = {} }) => {
  const OPACITY = ["opacity-100", "opacity-60", "opacity-30"];
  const used = data?.used_stats?.used || 0;
  const unused = data?.used_stats?.unused || 0;
  const total = used + unused;

  const activities = [
    {
      title: "My total leads",
      value: total,
      OPACITY: OPACITY[0],
      width: 10,
    },
    {
      title: "Leads Used",
      value: used,
      OPACITY: OPACITY[1],
      width: 8,
    },
    {
      title: "Remaining leads",
      value: unused,
      OPACITY: OPACITY[2],
      width: 6,
    },
  ];

  return (
    <CardContainer className="relative h-auto w-full min-h-[200px]">
      <InsightInfo data={activities} />
      <DonutAnimation data={activities} />
    </CardContainer>
  );
};

export default UsedLeadsInsight;
