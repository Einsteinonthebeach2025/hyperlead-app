"use client";
import Spinner from "app/components/Spinner";
import { getFeedback } from "app/lib/actions/reportActions";
import { useEffect, useState } from "react";
import FeedbackCard from "./feedbackCard/FeedbackCard";
import SectionHeadline from "app/components/SectionHeadline";

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const { data, error } = await getFeedback();
        if (error) {
          setError(error);
        } else {
          setFeedbacks(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <SectionHeadline
        title="No feedbacks found"
        desc="users feedbacks are not reported yet"
      />
    );
  }

  return (
    <section className="py-5 overflow-hidden center relative w-full border">
      <div className="flex items-center relative w-max">
        <FeedbackCard feedbacks={feedbacks} />
        <FeedbackCard feedbacks={feedbacks} />
        <FeedbackCard feedbacks={feedbacks} />
      </div>
    </section>
  );
};

export default FeedbackSlider;
