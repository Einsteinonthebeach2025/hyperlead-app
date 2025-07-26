const AnalyticsLayout = ({
  children,
  userActivity,
  leadsCountry,
  leadsIndustry,
}) => {
  return (
    <div className="py-3 pl-3 lg:pr-6 space-y-3">
      {children}
      {userActivity}
      <div className="grid grid-cols-[1.2fr_1.8fr] gap-3 center *:h-full">
        {leadsCountry}
        {leadsIndustry}
      </div>
    </div>
  );
};

export default AnalyticsLayout;
