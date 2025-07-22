import { useState } from "react";
import { submitBug } from "app/lib/actions/reportActions";
import { setError } from "app/features/modalSlice";
import { FaBug } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "app/components/buttons/Button";

const BugForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dispatch) return;
    setLoading(true);
    const { data, error } = await submitBug({ header, message });
    if (error) {
      dispatch(setError(error));
    } else {
      dispatch(
        setError({ message: "Thank you for your feedback!", type: "success" })
      );
    }
    router.push("/");
    setLoading(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className=" space-y-5 center flex-col w-full *:w-full"
    >
      <div className="space-y-2">
        <label htmlFor="header">Bug Title</label>
        <input
          id="header"
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Headline for your bug"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="review">Bug Content</label>
        <textarea
          id="review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Report a bug to improve our service..."
          className="h-44"
          required
        />
      </div>
      <div className="center">
        <Button type="submit" loading={loading}>
          <FaBug />
          <span>Submit a bug</span>
        </Button>
      </div>
    </form>
  );
};

export default BugForm;
