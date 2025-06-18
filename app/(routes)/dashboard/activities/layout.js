const AnalyticsLayout = ({
  basicStatistics,
  usedLeadsStatistics,
  emailStatistics,
  leadsRegionStatistics,
  employeeStatistics,
  industryStatistics,
  randomTopLead,
  children,
}) => {
  return (
    <div className="px-3 lg:pr-4">
      {children}
      {basicStatistics}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-4 py-4">
        {usedLeadsStatistics}
        {emailStatistics}
        {employeeStatistics}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
        {leadsRegionStatistics}
        <div className="space-y-4 flex flex-col">
          {industryStatistics}
          {randomTopLead}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsLayout;
