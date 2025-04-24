export const validatePassword = ({
  password,
  dispatch,
  setError,
  confirmPassword,
}) => {
  if (password.length < 8) {
    dispatch(setError("Password must be at least 8 characters"));
    return false;
  }
  if (!/\d/.test(password)) {
    dispatch(setError("Password must contain at least one number"));
    return false;
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    dispatch(
      setError("Password must contain both uppercase and lowercase letters")
    );
    return false;
  }
  if (password !== confirmPassword) {
    dispatch(setError("Passwords do not match"));
    return false;
  }
  return true;
};
