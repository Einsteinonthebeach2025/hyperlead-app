"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import { sendEmail } from "app/lib/actions/emailActions";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmailForm = ({ data = {}, closeModal }) => {
  const { user } = useSelector((store) => store.user || {});
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    if (!user?.id) {
      setError("User not authenticated");
      setIsSending(false);
      return;
    }

    try {
      const result = await sendEmail({
        user_id: user.id,
        email: user.email,
        lead_id: data.id,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        // closeModal();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full my-5">
      <FlexBox type="row" className="gap-3 *:w-full">
        <div>
          <SubTitle>From</SubTitle>
          <input
            id="user_email"
            name="user_email"
            type="email"
            value={user?.email || ""}
            disabled
          />
        </div>
        <div>
          <SubTitle>To</SubTitle>
          <input
            id="lead_email"
            name="lead_email"
            type="email"
            value="graphchiqovani@yahoo.com"
            disabled
          />
        </div>
      </FlexBox>
      <div>
        <SubTitle>Subject</SubTitle>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <SubTitle>Message</SubTitle>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <SubmitButtons
        isSubmitting={isSending}
        onCancel={closeModal}
        submitText="Send Email"
      />
    </form>
  );
};

export default EmailForm;
