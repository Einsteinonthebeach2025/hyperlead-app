export const validateForm = ({
  email,
  password,
  confirmPassword,
  dispatch,
  setError,
}) => {
  if (!email || !password || !confirmPassword) {
    dispatch(setError("All fields are required"));
    return false;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    dispatch(setError("Please enter a valid email address"));
    return false;
  }
  if (password !== confirmPassword) {
    dispatch(setError("Passwords do not match"));
    return false;
  }
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
  return true;
};
