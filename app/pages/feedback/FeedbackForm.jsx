"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { submitFeedback } from "app/lib/actions/feedbackActions";
import { setError } from "app/features/modalSlice";
import Button from "app/components/buttons/Button";
import StarInputs from "./StarInputs";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [header, setHeader] = useState("");
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const MAX_REVIEW_LENGTH = 300;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dispatch) return;

    setLoading(true);
    if (rating === 0) {
      dispatch(setError("Please select a rating"));
      setLoading(false);
      return;
    }
    if (review.length > MAX_REVIEW_LENGTH) {
      dispatch(setError("Review must be less than 400 characters"));
      setLoading(false);
      return;
    }
    const { data, error } = await submitFeedback({
      rating,
      header,
      review,
    });
    if (error) {
      dispatch(setError(error));
    } else {
      dispatch(
        setError({
          message: "Thank you for your feedback!",
          type: "success",
        })
      );
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className=" space-y-5 center flex-col w-full"
    >
      <div className="w-full space-y-4">
        <StarInputs
          hover={hover}
          rating={rating}
          setHover={setHover}
          setRating={setRating}
        />

        <div className="space-y-2">
          <label htmlFor="header">Feedback Title</label>
          <input
            id="header"
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Brief title for your feedback"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="review">Feedback Content</label>
          <p
            className={`text-sm pl-1 font-semibold ${
              review.length > MAX_REVIEW_LENGTH
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {MAX_REVIEW_LENGTH - review.length} Characters
          </p>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with us..."
            className="h-44"
            required
          />
        </div>
      </div>

      <Button type="submit" loading={loading}>
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
