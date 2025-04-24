import GradientContainer from "app/components/containers/GradientContainer";

const ResetPwdLayout = ({ children }) => {
  return (
    <section className="flex-col z-20 relative h-screen center bg-[#f8fafc] w-full">
      <GradientContainer />
      {children}
    </section>
  );
};

export default ResetPwdLayout;
