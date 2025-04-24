import GradientContainer from "app/components/containers/GradientContainer";
import DashboardSide from "app/pages/dashboard/dashboardSide/DashboardSide";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-full relative">
      <GradientContainer />
      <DashboardSide />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
