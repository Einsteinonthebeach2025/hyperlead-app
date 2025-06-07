"use client";
import { filterLeads } from "app/helpers/filterHelpers";
import { useState, useMemo, useEffect } from "react";
import LeadCard from "./leadsLayout/LeadCard";
import LeadsPaginationButtons from "./leadsNavigation/LeadsPaginationButtons";
import LeadFilter from "./leadsNavigation/LeadFilter";
import SectionHeadline from "app/components/SectionHeadline";
import DashboardPageWrapper from "app/components/containers/DashboardPageWrapper";

const Leads = ({
  data,
  desc,
  message,
  currentPage = 1,
  allLeads: initialAllLeads,
}) => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(currentPage);
  const leadsPerPage = 20;
  const [leads, setLeads] = useState(data || []);
  const [allLeads, setAllLeads] = useState(initialAllLeads || []);
  const [searchResults, setSearchResults] = useState(null);

  if (!data) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title={message}
          desc={desc}
        />
      </div>
    );
  }

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

  const handleLeadStatusChange = (leadId, newStatus, e) => {
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

  const handleLeadLikeChange = (leadId, likesArray) => {
    setLeads((prevLeads) =>
      prevLeads?.map((lead) =>
        lead.id === leadId ? { ...lead, likes: likesArray } : lead
      )
    );
    setAllLeads((prevAllLeads) =>
      prevAllLeads?.map((lead) =>
        lead.id === leadId ? { ...lead, likes: likesArray } : lead
      )
    );
  };

  return (

    <DashboardPageWrapper title="Leads">
      <LeadFilter
        leads={allLeads}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        currentFilters={filters}
        onSearchResults={handleSearchResults}
        currentPageLeads={paginatedLeads}
      />
      <LeadCard
        leads={paginatedLeads}
        onLeadStatusChange={handleLeadStatusChange}
        onLeadLikeChange={handleLeadLikeChange}
      />
      <LeadsPaginationButtons
        currentPage={page}
        allLeads={allLeads}
        leadsPerPage={leadsPerPage}
        totalPages={totalFilteredPages}
        onPageChange={handlePageChange}
      />
    </DashboardPageWrapper>
  );
};

export default Leads;
