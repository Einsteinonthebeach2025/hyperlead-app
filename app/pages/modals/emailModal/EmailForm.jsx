"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import Button from "app/components/buttons/Button";
import { sendEmail } from "app/lib/actions/emailActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedLeads, setError } from "app/features/modalSlice";
import { FaEnvelope } from "react-icons/fa";
import SpanText from "app/components/SpanText";

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

  const recipients = data?.map((lead) => lead)

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full my-5">
      <FlexBox type="row" className="gap-3 *:w-full">
        <div>
          <SpanText>From</SpanText>
          <SubTitle className="lowercase">{user?.email}</SubTitle>
        </div>
        <div>
          <SpanText>To</SpanText>
          {recipients?.length > 1 ? <SubTitle className="lowercase">{recipients.length} recipients selected</SubTitle> : <SubTitle className="lowercase">{recipients[0]?.email}</SubTitle>}
        </div>
      </FlexBox>
      <div>
        <SubTitle>Subject</SubTitle>
        <input
          type="text"
          name="subject"
          placeholder="headline of the email"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <SubTitle>Message</SubTitle>
        <textarea
          name="message"
          placeholder="body of the email"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>

      <Button loading={loading} type="submit" disabled={loading}>
        <FaEnvelope />
        <span>Send Email</span>
      </Button>
    </form>
  );
};

export default EmailForm;
