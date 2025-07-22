import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ leads = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      onSearch?.(leads);
      return;
    }

    const searchTermLower = value.toLowerCase();
    const filteredLeads = leads.filter((lead) => {
      return (
        lead.country?.toLowerCase().includes(searchTermLower) ||
        lead.seniority?.toLowerCase().includes(searchTermLower) ||
        lead.city?.toLowerCase().includes(searchTermLower) ||
        lead.company_title?.toLowerCase().includes(searchTermLower) ||
        lead.email?.toLowerCase().includes(searchTermLower) ||
        lead.industry?.some((industry) =>
          industry.toLowerCase().includes(searchTermLower)
        )
      );
    });

    onSearch?.(filteredLeads);
  };

  return (
    <div className="relative">
      <input
        id="lead-search-input"
        name="lead-search"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search your leads..."
        className="search-bar"
        autoComplete="off"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
    </div>
  );
};

export default SearchBar;
