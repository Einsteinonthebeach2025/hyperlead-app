import SpanText from 'app/components/SpanText';

const EmailInputs = ({ formData, setFormData, data }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isSequence = data.length > 1;


  return (
    <>
      <div>
        <SpanText>Subject</SpanText>
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
        <SpanText>Message</SpanText>
        <textarea
          name="message"
          placeholder="body of the email"
          className='text-[12px]'
          value={formData.message}
          onChange={handleChange}
          required
          rows={12}
        />
      </div>

      {isSequence && (
        <div>
          <SpanText>Email Sequence Name</SpanText>
          <input
            type="text"
            name="sequence_name"
            placeholder="Name your email sequence"
            value={formData.sequence_name}
            onChange={handleChange}
            required
          />
        </div>
      )}
    </>
  )
}

export default EmailInputs