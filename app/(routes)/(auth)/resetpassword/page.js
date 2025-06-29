import ResetPassword from "app/pages/authentication/resetpassword/ResetPassword";

export const metadata = {
  title: "Hyperlead | Reset Password",
  description:
    "Request a password reset link to securely update your Hyperlead account password.",
};

const ResetPasswordPage = () => {
  return <ResetPassword />;
};

export default ResetPasswordPage;
