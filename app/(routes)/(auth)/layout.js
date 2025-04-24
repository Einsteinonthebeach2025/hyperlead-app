import GradientContainer from "app/components/containers/GradientContainer";

const AuthLayout = ({ children }) => {
  return (
    <section className="flex-col z-20 relative top-0 center bg-[#f8fafc]">
      <GradientContainer />
      {children}
    </section>
  );
};

export default AuthLayout;
