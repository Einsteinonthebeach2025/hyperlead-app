import SideComponent from "./SideComponent";
import SimulateExpire from "app/SimulateExpire";
const DashboardSide = () => {
  return (
    <div className="w-full md:w-[30%] lg:w-[20%] relative py-5">
      <div className="sticky top-20 w-full px-5">
        <SideComponent />
        <div className="center py-2">
          <SimulateExpire />
        </div>
      </div>
    </div>
  );
};

export default DashboardSide;
