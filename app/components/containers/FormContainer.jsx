const FormContainer = ({ className, children }) => {
  return (
    <div
      className={`${className} primary-border center flex-col bg-white primary-outline`}
    >
      {children}
    </div>
  );
};

export default FormContainer;
