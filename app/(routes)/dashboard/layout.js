import DashboardSide from "app/pages/dashboard/dashboardSide/DashboardSide";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col z-[5] md:flex-row w-full relative dark:bg-[#151e27]">
      <DashboardSide />
      <div className="flex-1 relative">{children}</div>
    </div>
  );
};

export default DashboardLayout;
