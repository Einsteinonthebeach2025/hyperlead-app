"use client";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import { sendEmail } from "app/lib/actions/emailActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButtons from "./SubmitButtons";
import { setError } from "app/features/modalSlice";

const EmailForm = ({ data = {}, closeModal }) => {
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
    if (!user?.id) {
      dispatch(setError("User not authenticated"));
      setLoading(false);
      return;
    }
    try {
      const result = await sendEmail({
        user_id: user.id,
        email: user.email,
        lead_id: data?.id,
        // lead_email: data?.email,
        lead_email: "graphchiqovani@yahoo.com",
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        closeModal();
        dispatch(
          setError({ message: "Email sent successfully", type: "success" })
        );
      } else {
        setError(result.error);
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
            type="email"
            // value={data?.email}
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
      <SubmitButtons
        loading={loading}
        onCancel={closeModal}
        submitText="Send Email"
      />
    </form>
  );
};

export default EmailForm;
