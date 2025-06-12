"use client"
import { useState } from 'react';
import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import SectionHeadline from 'app/components/SectionHeadline';
import SequenceBar from './sequenceBar/SequenceBar';
import SequenceContent from './sequenceContent/SequenceContent';

const EmailSequences = ({ data }) => {
  const [sequences, setSequences] = useState(data);
  const [active, setActive] = useState(data[0]);

  const handleDeleteSequence = (sequenceId) => {
    const updated = sequences?.filter(seq => seq.sequence_id !== sequenceId);
    setSequences(updated);
    setActive(updated[0] || null);
  };

  if (sequences?.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title="No emails sequences found"
          desc="After sending an sequenced emails, you will have your outbox here"
        />
      </div>
    );
  }

  return (
    <DashboardPageWrapper title="My Sequences">
      <div className="flex flex-col lg:flex-row gap-4">
        <SequenceBar data={sequences} active={active} setActive={setActive} />
        <SequenceContent active={active} onDeleteSequence={handleDeleteSequence} />
      </div>
    </DashboardPageWrapper>
  );
};

export default EmailSequences