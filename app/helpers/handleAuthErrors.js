const handleAuthError = (error) => {
  if (error.message.includes("User already registered")) {
    return "This email is already registered. Please try login or use different email.";
  }
  if (error.message.includes("Invalid email")) {
    return "Please enter a valid email address.";
  }
  if (error.message.includes("Password should be")) {
    return "Password must be at least 6 characters long.";
  }
  if (error.message.includes("rate limit")) {
    return "Too many attempts. Please try again in a few minutes.";
  }
  if (error.message.includes("Email rate limit exceeded")) {
    return "Email rate limit exceeded. Please try again in a few minutes.";
  }
  return error.message || "An unexpected error occurred";
};

export default handleAuthError;
