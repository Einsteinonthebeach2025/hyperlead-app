import CardContainer from "app/components/containers/CardContainer";
import IconContainer from "app/components/containers/IconContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import SubTitle from "app/components/SubTitle";
import Title from "app/components/Title";
import { LuBadgeCheck } from "react-icons/lu";
import { RiBarChartBoxAiLine } from "react-icons/ri";
import { TbCalendarPlus, TbWorldDownload } from "react-icons/tb";

const BasicStats = ({ data }) => {
  const basicStats = [
    {
      title: "Current Plan",
      value: !data?.subscription ? "No Active Plan" : data?.subscription,
      icon: <LuBadgeCheck />,
    },
    {
      title: "Monthly Leads for current plan",
      value: data?.monthly_leads || 0,
      icon: <RiBarChartBoxAiLine />,
    },
    {
      title: "Leads Received This Month",
      value: data?.leads_received_this_month || 0,
      icon: <TbCalendarPlus />,
    },
    {
      title: "Total Leads Received",
      value: data?.total_leads_received || 0,
      icon: <TbWorldDownload />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {basicStats?.map((stats, index) => {
        const { icon, title, value } = stats;
        return (
          <MotionChildren key={index} animation="fade-in">
            <CardContainer className="space-y-1 capitalize h-auto min-h-[120px]">
              <IconContainer size="md">
                {icon}
              </IconContainer>
              <div className="h-full flex flex-col justify-between">
                <SubTitle className="h-10 md:h-auto text-sm line-clamp-2">{title}</SubTitle>
                <Title className="font-thin text-lg">{value}</Title>
              </div>
            </CardContainer>
          </MotionChildren>
        );
      })}
    </div>
  );
};

export default BasicStats;
