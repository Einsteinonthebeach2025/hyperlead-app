export const validateEmail = ({ email, dispatch, setError }) => {
  if (!email) {
    dispatch(setError("Please, enter your email"));
    return false;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    dispatch(setError("Please enter a valid email address"));
    return false;
  }
  return true;
};
