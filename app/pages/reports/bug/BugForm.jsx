import Button from 'app/components/buttons/Button';
import { setError } from 'app/features/modalSlice';
import { submitBug } from 'app/lib/actions/reportActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { FaBug } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const BugForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [header, setHeader] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await submitBug({
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
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className=" space-y-5 center flex-col w-full"
    >
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label htmlFor="header">Bug Title</label>
          <input
            id="header"
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Brief title for your bug"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="review">Bug Content</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Report the bug you've encountered"
            className="h-44"
            required
          />
        </div>
      </div>

      <Button type="submit" loading={loading}>
        <FaBug />
        <span>Submit Bug</span>
      </Button>
    </form>
  )
}

export default BugForm