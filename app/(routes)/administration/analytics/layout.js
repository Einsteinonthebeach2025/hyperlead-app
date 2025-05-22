const AnalyticsLayout = ({ children, userActivity, leadsUsage }) => {
  return (
    <div className="py-3 lg:pr-6 space-y-3">
      {children}
      {userActivity}
      {leadsUsage}
    </div>
  );
};

export default AnalyticsLayout;
