import Button from "app/components/buttons/Button";
import { FaRotateLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";


const FilterBar = ({
  data,
  currentFilters,
  handleFilterChange,
  handleReset,
  filterConfig,
}) => {
  const hasActiveFilters =
    currentFilters &&
    Object.values(currentFilters).some((value) => value !== "all");

  return (
    <div className="flex gap-2">
      {filterConfig?.map((filter) => {
        const options = filter.getOptions(data);
        const value = currentFilters[filter.type] || "all";
        return (
          <div key={filter.type} className="relative">
            <select
              id={filter.id}
              name={filter.id}
              value={value}
              onChange={(e) => handleFilterChange(filter.type, e.target.value)}
              className="appearance-none pr-8 hover:bg-neutral-200 duration-300"
            >
              <option value="all">{filter.label === "Users" ? "All Users" : filter.label}</option>
              {options?.map((option) => (
                <option
                  key={typeof option === "object" ? option.value : option}
                  value={typeof option === "object" ? option.value : option}
                >
                  {typeof option === "object" ? option.label : option}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown size={16} className="text-gray-500" />
            </div>
          </div>
        );
      })}
      {hasActiveFilters && (
        <Button
          type="success"
          onClick={handleReset}
          className="cursor-pointer rounded-md"
        >
          <FaRotateLeft size={16} />
          <span>Reset Filters</span>
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
