import ErrorMsg from "app/components/ErrorMsg";

const ResetError = ({ error, success }) => {
  return (
    <div className="absolute top-5 right-5">
      {success ? (
        <ErrorMsg type="success" error={error}>
          {error}
        </ErrorMsg>
      ) : (
        <ErrorMsg error={error}>{error}</ErrorMsg>
      )}
    </div>
  );
};

export default ResetError;
