"use client"
import MotionContainer from 'app/components/containers/MotionContainer';
import Headline from 'app/components/Headline';
import SectionHeadline from 'app/components/SectionHeadline';
import UsersList from './list/UsersList';
import FilterBar from 'app/components/FilterBar';
import { useState } from 'react';
import { filterUsers, userFilterConfig } from 'app/helpers/filterHelpers';
import Button from 'app/components/buttons/Button';
import supabase from 'app/lib/config/supabaseClient';

const UserManagement = ({ data: initialUsers, totalCount, message, desc }) => {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(20); // Start from 20 since we already have first 20
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

  const loadMoreUsers = async () => {
    try {
      setLoading(true);

      const { data: newUsers, error } = await supabase
        .from("profiles")
        .select(`
          id, address, avatar_url, city, company, created_at, email, firstName, lastName,
          leads_received_this_month, linkedin_url, phone, position, country, reported_bugs,
          sex, subscription, subscription_timestamp, total_leads_received, twitter_url,
          userBirthDate, userName, web_url, address,
          transactions (
            id, order_id, plan_name, amount, status, created_at
          )
        `)
        .order('created_at', { ascending: true })
        .range(offset, offset + 19);

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }

      if (newUsers?.length === 0) {
        return;
      }

      setUsers(prev => [...prev, ...newUsers]);
      setOffset(prev => prev + 20);
    } catch (error) {
      console.error("Error in loadMoreUsers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = filterUsers(users, currentFilters);
  const hasMore = users?.length < totalCount;

  if (!initialUsers || initialUsers?.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title={message || "No users"}
          desc={desc || "No users found"}
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
        data={users}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        filterConfig={userFilterConfig}
      />
      <UsersList data={filteredUsers} />
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            type="blue"
            onClick={loadMoreUsers}
            disabled={loading}
            loading={loading}
          >
            <span>{loading ? "Loading..." : "Load More"}</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserManagement