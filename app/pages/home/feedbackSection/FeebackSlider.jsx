"use client";
import Spinner from "app/components/Spinner";
import Title from "app/components/Title";
import { getFeedback } from "app/lib/actions/feedbackActions";
import { useEffect, useState } from "react";
import FeedbackCard from "./feedbackCard/FeedbackCard";

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

  if (error) {
    return (
      <section className="py-5 overflow-hidden center relative w-full">
        <Title>Error loading feedbacks: {error}</Title>
      </section>
    );
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
