import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";
import PwdStrengthCheck from "../signUpSection/signUp/PwdStrengthCheck";
import Button from "app/components/buttons/Button";

const UpdatePasswordForm = ({
  password,
  confirmPassword,
  handleSubmit,
  loading,
}) => {
  return (
    <FormContainer className="w-[90%] max-w-[400px] space-y-2">
      <MotionContainer animation="zoom-out">
        <Title>Update Password</Title>
      </MotionContainer>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PwdStrengthCheck password={password} />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="mt-1"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          text="Updating password"
          loading={loading}
          disabled={loading}
        >
          Update Password
        </Button>
      </form>
    </FormContainer>
  );
};

export default UpdatePasswordForm;
