const FormContainer = ({ className, children }) => {
  return (
    <div
      className={`${className} primary-border p-5 center flex-col bg-white dark:bg-[#151e27] primary-outline`}
    >
      {children}
    </div>
  );
};

export default FormContainer;
