"use client"
import MotionContainer from 'app/components/containers/MotionContainer';
import Headline from 'app/components/Headline';
import SectionHeadline from 'app/components/SectionHeadline';
import UsersList from './list/UsersList';
import FilterBar from 'app/components/FilterBar';
import { useState } from 'react';
import { filterUsers, userFilterConfig } from 'app/helpers/filterHelpers';

const UserManagement = ({ data, message, desc }) => {
  console.log(data);

  const [currentFilters, setCurrentFilters] = useState({
    subscription: "all"
  });

  const handleFilterChange = (type, value) => {
    setCurrentFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleReset = () => {
    setCurrentFilters({
      subscription: "all"
    });
  };

  const filteredUsers = filterUsers(data, currentFilters);

  if (!data || data.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title={message || "No feedbacks"}
          desc={desc || "Feedbacks are not reported yet"}
        />
      </div>
    );
  }

  return (
    <div className="py-3 lg:pr-6 space-y-3">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">User management</Headline>
      </MotionContainer>
      <FilterBar
        data={data}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        filterConfig={userFilterConfig}
      />
      <UsersList data={filteredUsers} />
    </div>
  )
}

export default UserManagement