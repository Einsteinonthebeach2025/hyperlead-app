"use client";
import LeadCard from "./leadsLayout/LeadCard";
import { useState, useMemo, useRef, useEffect } from "react";
import LeadsPaginationButtons from "./leadsNavigation/LeadsPaginationButtons";
import FlexBox from "app/components/containers/FlexBox";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";
import { filterLeads } from "app/helpers/leadsFilter";
import LeadFilter from "./leadsNavigation/LeadFilter";

const Leads = ({
  data,
  message,
  currentPage = 1,
  allLeads: initialAllLeads,
}) => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(currentPage);
  const leadsPerPage = 10;
  const listRef = useRef(null);
  const [leads, setLeads] = useState(data || []);
  const [allLeads, setAllLeads] = useState(initialAllLeads || []);
  const [searchResults, setSearchResults] = useState(null);

  if (!data) return <div className="center h-screen">{message}</div>;

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };
    if (value === "") {
      delete newFilters[type];
    } else {
      newFilters[type] = value;
    }
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setPage(1);
    setSearchResults(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setPage(1);
  };

  const filteredLeads = useMemo(() => {
    const leadsToFilter = searchResults || allLeads;
    return filterLeads(leadsToFilter, filters);
  }, [allLeads, filters, searchResults]);

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * leadsPerPage;
    const end = start + leadsPerPage;
    return filteredLeads.slice(start, end);
  }, [filteredLeads, page]);

  const totalFilteredPages = Math.ceil(filteredLeads.length / leadsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  useEffect(() => {
    setLeads(data || []);
    setAllLeads(initialAllLeads || []);
  }, [data, initialAllLeads]);

  const handleLeadStatusChange = (leadId, newStatus) => {
    setLeads((prevLeads) =>
      prevLeads?.map((lead) =>
        lead.id === leadId ? { ...lead, used: newStatus } : lead
      )
    );
    setAllLeads((prevAllLeads) =>
      prevAllLeads?.map((lead) =>
        lead.id === leadId ? { ...lead, used: newStatus } : lead
      )
    );
  };

  return (
    <div ref={listRef} className="w-full">
      <FlexBox type="column" className="lg:pr-8 py-3 space-y-5">
        <MotionContainer animation="fade-in">
          <Headline className="w-fit">Leads</Headline>
        </MotionContainer>
        <LeadFilter
          leads={allLeads}
          handleFilterChange={handleFilterChange}
          handleReset={handleReset}
          currentFilters={filters}
          onSearchResults={handleSearchResults}
        />
        <LeadCard
          leads={paginatedLeads}
          onLeadStatusChange={handleLeadStatusChange}
        />
        <LeadsPaginationButtons
          currentPage={page}
          allLeads={allLeads}
          leadsPerPage={leadsPerPage}
          totalPages={totalFilteredPages}
          onPageChange={handlePageChange}
        />
      </FlexBox>
    </div>
  );
};

export default Leads;
