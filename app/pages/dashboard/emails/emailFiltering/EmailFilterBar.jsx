"use client";
import { MONTHS, FILTER_OPTIONS } from "app/helpers/filterHelpers";

const FilterSelect = ({ value, onChange, options, label }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const EmailFilterBar = ({
  month,
  setMonth,
  delivered,
  setDelivered,
  opened,
  setOpened,
}) => {
  const monthOptions = [
    { value: "all", label: "Sort By Month" },
    ...MONTHS.map((m) => ({ value: m, label: m })),
  ];

  return (
    <div className="flex gap-2">
      <FilterSelect value={month} onChange={setMonth} options={monthOptions} />
      <FilterSelect
        value={delivered}
        onChange={setDelivered}
        options={FILTER_OPTIONS.delivery}
      />
      <FilterSelect
        value={opened}
        onChange={setOpened}
        options={FILTER_OPTIONS.open}
      />
    </div>
  );
};

export default EmailFilterBar;
