import CardContainer from "app/components/containers/CardContainer";
import IconContainer from "app/components/containers/IconContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import SubTitle from "app/components/SubTitle";
import Title from "app/components/Title";
import { MdLeaderboard, MdSubscriptions } from "react-icons/md";

const BasicStats = ({ data }) => {
  const basicStats = [
    {
      title: "Current Plan",
      value: data?.subscription,
      icon: <MdSubscriptions />,
    },
    {
      title: "Monthly Leads for current plan",
      value: data?.monthly_leads,
      icon: <MdLeaderboard />,
    },
    {
      title: "Leads Received This Month",
      value: data?.leads_received_this_month,
      icon: <MdLeaderboard />,
    },
    {
      title: "Total Leads Received",
      value: data?.total_leads_received,
      icon: <MdLeaderboard />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {basicStats?.map((stats, index) => {
        const { icon, title, value } = stats;
        return (
          <MotionChildren key={index} animation="fade-in">
            <CardContainer className="space-y-1 capitalize ">
              <IconContainer size="sm" className="text-xl">
                {icon}
              </IconContainer>
              <div>
                <SubTitle className="h-10 mg:h-auto">{title}</SubTitle>
                <Title className="font-thin">{value}</Title>
              </div>
            </CardContainer>
          </MotionChildren>
        );
      })}
    </div>
  );
};

export default BasicStats;
