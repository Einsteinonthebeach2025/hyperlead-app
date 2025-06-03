import EmailDetails from "./components/EmailDetails";
import EmailInputs from "./components/EmailInputs";
import EmailFormButtons from "./components/EmailFormButtons";

const EmailForm = ({ data = [], handleClick, loading, formData, setFormData, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full my-5" noValidate>
      <EmailDetails data={data} />
      <EmailInputs formData={formData} setFormData={setFormData} data={data} />
      <EmailFormButtons loading={loading} formData={formData} setFormData={setFormData} handleClick={handleClick} />
    </form>
  );
};

export default EmailForm;