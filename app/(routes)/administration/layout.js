import FlexBox from "app/components/containers/FlexBox";
import GradientContainer from "app/components/containers/GradientContainer";
import AdminSideBar from "app/pages/adminPanel/sidebar/AdminSideBar";

const AdministrationLayout = ({children}) => {
  return (
    <FlexBox type="row" className="w-full relative">
      <GradientContainer/>
      <AdminSideBar/>
      <div className="flex-1">{children}</div>
    </FlexBox>
  );
};

export default AdministrationLayout;
