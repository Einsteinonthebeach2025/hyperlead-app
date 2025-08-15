"use client";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedLeads, selectEmailModal, setError, setToggle } from "app/features/modalSlice";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { sendEmail, incrementEmailCampaignCount } from "app/lib/actions/emailActions";
import { useState } from "react";
import { selectUser } from "app/features/userSlice";
import EmailForm from "./EmailForm";
import ModalWrapper from "app/components/containers/ModalWrapper";
import AssistantPrompt from "./components/actionButtons/AssistantPrompt";

const EmailModal = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(selectEmailModal);
  const { isOpen: assistantOpen, toggleState } = useToggleLocal();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    sequence_name: "",
    follow_up: false,
  });

  const validateForm = () => {
    const errors = [];

    // Check if subject is filled
    if (!formData.subject.trim()) {
      errors.push("Subject is required");
    }

    // Check if message is filled
    if (!formData.message.trim()) {
      errors.push("Message is required");
    }

    // Check if sequence_name is filled for campaigns (multiple leads)
    if (data && data.length > 1 && !formData.sequence_name.trim()) {
      errors.push("Email sequence name is required for campaigns");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      dispatch(setError({
        message: validationErrors.join(", "),
        type: "error"
      }));
      return;
    }

    setLoading(true);
    try {
      let results;
      const isSequence = Boolean(formData.sequence_name);
      const isCampaign = isSequence || (data && data.length > 1);
      if (isSequence) {
        const sequence_id = crypto.randomUUID();
        results = await Promise.all(
          data.map((lead) =>
            sendEmail({
              user_id: user.id,
              email: user.email,
              lead_id: lead.id,
              lead_email: lead.email,
              subject: formData.subject,
              message: formData.message,
              type: "sequenced_email",
              sequence_name: formData.sequence_name,
              sequence_id,
              follow_up: formData.follow_up,
            })
          )
        );
      } else {
        results = await Promise.all(
          data.map((lead) =>
            sendEmail({
              user_id: user.id,
              email: user.email,
              lead_id: lead.id,
              lead_email: lead.email,
              subject: formData.subject,
              message: formData.message,
              type: data.length > 1 ? "sequenced_email" : "single_email",
              sequence_name: data.length > 1 ? formData.sequence_name : null,
              sequence_id: data.length > 1 ? crypto.randomUUID() : null,
              follow_up: formData.follow_up,
            })
          )
        );
      }
      const allSuccessful = results.every((result) => result.success);
      if (allSuccessful) {
        if (isCampaign) {
          await incrementEmailCampaignCount(user.id);
        }
        closeModal();
        dispatch(clearSelectedLeads());
        dispatch(
          setError({
            message: isCampaign
              ? `Email sequence${formData.sequence_name ? ` "${formData.sequence_name}"` : ""} sent successfully to ${data.length} recipients`
              : `Email sent successfully to ${data.length} recipient${data.length > 1 ? "s" : ""}`,
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


  const closeModal = () => {
    dispatch(setToggle({
      modalType: 'email',
      isOpen: false
    }));
    setFormData({
      subject: "",
      message: "",
      sequence_name: "",
      follow_up: false,
    });
  };

  const toggleAssistant = () => {
    toggleState(true);
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeModal}
      title="Send Email"
    >
      <AssistantPrompt isOpen={assistantOpen} handleClick={toggleAssistant} setFormData={setFormData} />
      <EmailForm
        data={data}
        closeModal={closeModal}
        handleClick={toggleAssistant}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </ModalWrapper>
  );
};

export default EmailModal;
