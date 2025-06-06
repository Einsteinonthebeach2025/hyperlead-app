"use client"
import { useState } from 'react';
import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import SectionHeadline from 'app/components/SectionHeadline';
import LeadCard from '../leads/leadsLayout/LeadCard';

const FavoriteLeads = ({ data, title, desc }) => {
  const [leads, setLeads] = useState(data || []);

  if (leads.length === 0) {
    return (
      <div className="center h-screen">
        <SectionHeadline title={title} desc={desc} />
      </div>
    )
  }

  const handleLeadStatusChange = (leadId, newStatus, e) => {
    setLeads((prevLeads) =>
      prevLeads?.map((lead) =>
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
  };

  return (
    <DashboardPageWrapper title="Favorite Leads">
      <LeadCard
        type="favorite"
        leads={leads}
        onLeadStatusChange={handleLeadStatusChange}
        onLeadLikeChange={handleLeadLikeChange}
      />
    </DashboardPageWrapper>
  )
}

export default FavoriteLeads