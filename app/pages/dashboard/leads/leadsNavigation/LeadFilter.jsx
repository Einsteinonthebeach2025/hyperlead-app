import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import FilterBar from "./filtering/FilterBar";
import SearchBar from "./filtering/SearchBar";
import { useState, useEffect } from "react";

const LeadFilter = ({
  leads = [],
  handleFilterChange,
  handleReset,
  currentFilters = {},
  onSearchResults,
}) => {
  const [filteredLeads, setFilteredLeads] = useState(leads);

  const handleSearch = (searchResults) => {
    setFilteredLeads(searchResults);
    onSearchResults?.(searchResults);
  };

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  return (
    <FlexBox type="column-center" className="gap-2">
      <SubTitle>Filter leads as your need</SubTitle>
      <div className="flex flex-col gap-2">
        <FilterBar
          leads={filteredLeads}
          currentFilters={currentFilters}
          handleReset={handleReset}
          handleFilterChange={handleFilterChange}
        />
        <SearchBar leads={leads} onSearch={handleSearch} />
      </div>
      {/* <LeadsNaming /> */}
    </FlexBox>
  );
};

export default LeadFilter;
