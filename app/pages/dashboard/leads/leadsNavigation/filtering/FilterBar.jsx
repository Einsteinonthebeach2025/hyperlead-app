import SpanContainer from "app/components/containers/SpanContainer";
import { filterConfig } from "app/helpers/leadsFilter";
import { FaRotateLeft } from "react-icons/fa6";

const FilterBar = ({
  leads,
  currentFilters,
  handleFilterChange,
  handleReset,
}) => {
  const selectClassName =
    "appearance-none bg-neutral-100 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-[0.5px] focus:ring-neutral-400";

  const hasActiveFilters =
    currentFilters &&
    Object.values(currentFilters).some((value) => value !== "");

  return (
    <div className="flex gap-2">
      {filterConfig?.map((filter) => {
        const options = filter.getOptions(leads);
        return (
          <div key={filter.type} className="relative">
            <select
              id={filter.id}
              name={filter.id}
              value={currentFilters[filter.type] || ""}
              className={selectClassName}
              onChange={(e) => handleFilterChange(filter.type, e.target.value)}
            >
              <option value="">{filter.label}</option>
              {options?.map((option) => (
                <option
                  key={typeof option === "object" ? option.value : option}
                  value={typeof option === "object" ? option.value : option}
                >
                  {typeof option === "object" ? option.label : option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      {hasActiveFilters && (
        <SpanContainer
          color="green"
          onClick={handleReset}
          className="cursor-pointer rounded-lg px-3 flex items-center gap-2"
        >
          <FaRotateLeft size={16} />
          <span className="text-sm">Reset Filters</span>
        </SpanContainer>
      )}
    </div>
  );
};

export default FilterBar;
