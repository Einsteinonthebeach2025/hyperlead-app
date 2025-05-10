"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import { sendEmail } from "app/lib/actions/emailActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButtons from "./SubmitButtons";
import { clearSelectedLeads, setError } from "app/features/modalSlice";

const EmailForm = ({ data = [], closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user || {});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailPromises = data.map((lead) =>
        sendEmail({
          user_id: user.id,
          email: user.email,
          lead_id: lead.id,
          lead_email: lead.email,
          subject: formData.subject,
          message: formData.message,
        })
      );
      const results = await Promise.all(emailPromises);
      const allSuccessful = results.every((result) => result.success);
      if (allSuccessful) {
        closeModal();
        dispatch(clearSelectedLeads());
        dispatch(
          setError({
            message: `Email sent successfully to ${data.length} recipient${data.length > 1 ? "s" : ""}`,
            type: "success",
          })
        );
      } else {
        const errors = results
          .filter((result) => !result.success)
          .map((result) => result.error)
          .join(", ");
        dispatch(setError(errors));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const recipientEmails = data?.map((lead) => lead.email).join(", ");

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full my-5">
      <FlexBox type="row" className="gap-3 *:w-full">
        <div>
          <SubTitle>From</SubTitle>
          <input
            id="user_email"
            name="user_email"
            type="email"
            value={user?.email}
            disabled
          />
        </div>
        <div>
          <SubTitle>To</SubTitle>
          <input
            id="lead_email"
            name="lead_email"
            type="text"
            value={recipientEmails}
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
      <SubmitButtons
        loading={loading}
        onCancel={closeModal}
        submitText={`Send Email${data.length > 1 ? ` to ${data.length} Recipients` : ""}`}
      />
    </form>
  );
};

export default EmailForm;
