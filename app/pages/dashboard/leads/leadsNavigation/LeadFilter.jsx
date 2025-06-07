import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import FilterBar from "../../../../components/FilterBar";
import SearchBar from "../../../../components/SearchBar";
import { useState, useEffect } from "react";
import { filterConfig } from "app/helpers/filterHelpers";
import SelectAllButton from "./filderActionButtons/SelectAllButton";
import NewCampaignButton from "./filderActionButtons/NewCampaignButton";

const LeadFilter = ({
  leads = [],
  handleFilterChange,
  handleReset,
  currentFilters = {},
  onSearchResults,
  currentPageLeads = [],
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
      <div className="grid grid-cols-[2fr_0.6fr] gap-2">
        <FilterBar
          data={filteredLeads}
          currentFilters={currentFilters}
          handleReset={handleReset}
          handleFilterChange={handleFilterChange}
          filterConfig={filterConfig}
        />
        <SearchBar leads={leads} onSearch={handleSearch} />
      </div>
      <FlexBox type="row-start" className="gap-2">
        <NewCampaignButton />
        <SelectAllButton currentPageLeads={currentPageLeads} />
      </FlexBox>
    </FlexBox>
  );
};

export default LeadFilter;
