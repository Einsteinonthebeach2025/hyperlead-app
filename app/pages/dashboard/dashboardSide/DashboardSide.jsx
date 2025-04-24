import SideComponent from "./SideComponent";

const DashboardSide = () => {
  return (
    <div className="w-full md:w-[30%] lg:w-[20%] relative">
      <div className="sticky top-20 w-full px-5">
        <SideComponent />
      </div>
    </div>
  );
};

export default DashboardSide;
