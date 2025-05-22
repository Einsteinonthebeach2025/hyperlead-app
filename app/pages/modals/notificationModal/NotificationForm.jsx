"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import Button from "app/components/buttons/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, clearSelectedUsers } from "app/features/modalSlice";
import { notifyUserFomAdmin } from "app/lib/actions/notificationActions";
import { IoIosNotifications } from "react-icons/io";
import SpanText from "app/components/SpanText";

const NotificationForm = ({ data = [], closeModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [importance, setImportance] = useState("medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const notifications = await Promise.all(
        data.map(user => notifyUserFomAdmin(user.id, message, importance))
      );

      const hasError = notifications.some(notification => notification.error);
      if (hasError) {
        throw new Error("Failed to send some notifications");
      }

      closeModal();
      dispatch(clearSelectedUsers());
      dispatch(
        setError({
          message: `Notification sent successfully to ${data.length} recipient${data.length > 1 ? 's' : ''}`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const recipients = data.map(user => user);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full my-5">
      <FlexBox type="column">
        <SpanText>Recipient</SpanText>
        {recipients?.length === 1 ? <SubTitle className="lowercase">{recipients[0]?.email}</SubTitle> : <SubTitle>{recipients.length} recipients selected</SubTitle>}
      </FlexBox>
      <div>
        <SpanText>Importance Level</SpanText>
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <SubTitle>Message</SubTitle>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          placeholder="Enter your notification message..."
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={loading}
      >
        <IoIosNotifications />
        <span>
          {recipients?.length === 1 ? "Send Notification" : `Send to ${data.length} recipient${data.length > 1 ? 's' : ''}`}
        </span>
      </Button>
    </form>
  );
};

export default NotificationForm; 