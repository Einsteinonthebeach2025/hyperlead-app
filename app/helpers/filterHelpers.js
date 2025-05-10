// Filter configuration
export const filterConfig = [
  {
    id: "country",
    type: "country",
    label: "Countries",
    getOptions: (leads) => [
      ...new Set(leads.map((lead) => lead.country).filter(Boolean)),
    ],
  },
  {
    id: "employees",
    type: "employees",
    label: "Employees",
    getOptions: () => [
      { label: "0-50", value: "0-50" },
      { label: "50-100", value: "50-100" },
      { label: "100-500", value: "100-500" },
      { label: "500-1000", value: "500-1000" },
      { label: "1000-3000", value: "1000-3000" },
      { label: "3000 or more", value: "3000 or more" },
    ],
  },
  {
    id: "industry",
    type: "industry",
    label: "Industries",
    getOptions: (leads) => [
      ...new Set(leads.flatMap((lead) => lead.industry || []).filter(Boolean)),
    ],
  },
  {
    id: "city",
    type: "city",
    label: "Cities",
    getOptions: (leads) => [
      ...new Set(
        leads
          .map((lead) => lead.city)
          .filter(Boolean)
          .map((city) =>
            city.length > 17 ? city.slice(0, 17).trim() + "..." : city
          )
      ),
    ],
  },
  {
    id: "seniority",
    type: "seniority",
    label: "Seniority Levels",
    getOptions: (leads) => [
      ...new Set(leads.map((lead) => lead.seniority).filter(Boolean)),
    ],
  },
];

// Filter leads based on current filters
export const filterLeads = (leads, filters) => {
  return leads.filter((lead) => {
    if (filters.country && lead.country !== filters.country) return false;
    if (filters.employees) {
      const employeeCount = parseInt(lead.employees) || 0;
      const range = filters.employees;

      if (range === "3000 or more") {
        if (employeeCount < 3000) return false;
      } else {
        const [min, max] = range.split("-").map(Number);
        if (employeeCount < min || employeeCount > max) return false;
      }
    }
    if (
      filters.industry &&
      (!lead.industry || !lead.industry.includes(filters.industry))
    )
      return false;
    if (filters.city && lead.city !== filters.city) return false;
    if (filters.seniority && lead.seniority !== filters.seniority) return false;
    return true;
  });
};

// EMAIL FILTER LOGIC
export const filterEmails = (data, { search, month, delivered, opened }) => {
  return data.filter((item) => {
    const subject = item.subject?.toLowerCase() || "";
    const company = item.leads?.company_title?.toLowerCase() || "";
    const sentDate = new Date(item.sent_at);
    const sentMonth = sentDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const matchesSearch =
      subject.includes(search.toLowerCase()) ||
      company.includes(search.toLowerCase());
    const matchesMonth = month === "all" || sentMonth === month.toLowerCase();
    const matchesDelivered =
      delivered === "all" ||
      (delivered === "true" && item.delivered) ||
      (delivered === "false" && !item.delivered);
    const matchesOpened =
      opened === "all" ||
      (opened === "true" && item.opened_at) ||
      (opened === "false" && !item.opened_at);

    return matchesSearch && matchesMonth && matchesDelivered && matchesOpened;
  });
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const FILTER_OPTIONS = {
  delivery: [
    { value: "all", label: "Delivery Status" },
    { value: "true", label: "Delivered" },
    { value: "false", label: "Pending" },
  ],
  open: [
    { value: "all", label: "Opened Status" },
    { value: "true", label: "Opened" },
    { value: "false", label: "Pending" },
  ],
};
