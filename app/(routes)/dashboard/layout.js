import DashboardSide from "app/pages/dashboard/dashboardSide/DashboardSide";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col z-[5] md:flex-row w-full relative dark:bg-[#151e27] border-t border-neutral-200 dark:border-[#344c63]">
      <DashboardSide />
      <div className="flex-1 md:w-[70%] lg:w-[70%] relative">{children}</div>
    </div>
  );
};

export default DashboardLayout;
