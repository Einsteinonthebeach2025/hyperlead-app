"use client";
import { getFeedback } from "app/lib/actions/reportActions";
import { useEffect, useState } from "react";
import FeedbackCard from "./feedbackCard/FeedbackCard";
import Spinner from "app/components/Spinner";

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
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
    return (
      <section className="py-5 overflow-hidden center relative w-full">
        <Spinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 overflow-hidden center relative w-full">
        <div className="text-red-500">Failed to load feedbacks</div>
      </section>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="py-5 overflow-hidden center relative w-full">
      <div className="flex items-center relative w-max">
        <FeedbackCard feedbacks={feedbacks} />
        <FeedbackCard feedbacks={feedbacks} />
        <FeedbackCard feedbacks={feedbacks} />
      </div>
    </section>
  );
};

export default FeedbackSlider;
