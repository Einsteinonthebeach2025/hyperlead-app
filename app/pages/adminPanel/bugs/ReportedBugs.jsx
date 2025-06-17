'use client';
import { useState } from "react";
import MotionContainer from "app/components/containers/MotionContainer";
import Headline from "app/components/Headline";
import BugList from "./BugList";
import supabase from "app/lib/config/supabaseClient";
import Button from "app/components/buttons/Button";

const ReportedBugs = ({ bugs: initialBugs, totalCount }) => {
  const [bugs, setBugs] = useState(initialBugs);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(10); // Start from 10 since we already have first 10

  const loadMoreBugs = async () => {
    try {
      setLoading(true);

      // Fetch next 10 bug_reports
      const { data: newBugs, error } = await supabase
        .from("bug_reports")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + 9);

      if (error) {
        console.error("Error fetching bugs:", error);
        return;
      }

      if (newBugs.length === 0) {
        return;
      }

      // Fetch related user profiles for new bugs
      const userIds = newBugs.map(bug => bug.user_id);
      const { data: newProfiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, userName, avatar_url")
        .in("id", userIds);

      if (profileError) {
        console.error("Error fetching profiles:", profileError);
        return;
      }

      // Merge profile data into bugs
      const mergedBugs = newBugs.map(bug => {
        const user = newProfiles.find(profile => profile.id === bug.user_id);
        return {
          ...bug,
          userName: user?.userName || "Unknown",
          avatar_url: user?.avatar_url || null,
        };
      });

      // Append to previous bugs
      setBugs(prev => [...prev, ...mergedBugs]);
      setOffset(prev => prev + 10);
    } catch (error) {
      console.error("Error in loadMoreBugs:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = bugs.length < totalCount;

  return (
    <div className="py-3 lg:pr-6 space-y-3 min-h-screen">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">Reported bugs</Headline>
      </MotionContainer>
      <BugList bugs={bugs} />
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            type="blue"
            onClick={loadMoreBugs}
            disabled={loading}
            loading={loading}
          >
            <span> {loading ? "Loading..." : "Load More"}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportedBugs;
