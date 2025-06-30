import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import FilterBar from "../../../../components/FilterBar";
import SearchBar from "../../../../components/SearchBar";
import SelectAllButton from "./filderActionButtons/SelectAllButton";
import NewCampaignButton from "./filderActionButtons/NewCampaignButton";
import AddExtraLeads from "../../dashboardSide/extraLeads/AddExtraLeads";
import { useState, useEffect } from "react";
import { filterConfig } from "app/helpers/filterHelpers";
import LeadsNaming from "./LeadsNaming";
import SpanText from "app/components/SpanText";
import HyperSearch from "./filderActionButtons/HyperSearch";

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
    <FlexBox type="column-center" className="gap-2 sticky top-17 bg-white dark:bg-[#151e27] pb-2 z-20">
      <FlexBox type="column-center">
        <SubTitle>Filter Leads Based on Your Criteria</SubTitle>
        <SpanText> Use the filters below to narrow down your ideal prospects by country, company size, industry, city, or seniority level.</SpanText>
      </FlexBox>
      <div className="flex items-center gap-2">
        <FilterBar
          data={filteredLeads}
          currentFilters={currentFilters}
          handleReset={handleReset}
          handleFilterChange={handleFilterChange}
          filterConfig={filterConfig}
        />
        <SearchBar leads={leads} onSearch={handleSearch} />
      </div>
      <FlexBox type="row-start" className="gap-2 *:w-fit">
        <SelectAllButton currentPageLeads={currentPageLeads} />
        <NewCampaignButton />
        <AddExtraLeads type="extra" />
        <HyperSearch />
      </FlexBox>
      <LeadsNaming />
    </FlexBox>
  );
};

export default LeadFilter;
