import { MdLockReset } from "react-icons/md";
import Link from "next/link";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Title from "app/components/Title";
import Button from "app/components/buttons/Button";
import Paragraph from "app/components/Paragraph";
import FlexBox from "app/components/containers/FlexBox";

const ResetForm = ({ handleSubmit, loading, email, setEmail }) => {
  return (
    <FormContainer className="w-[90%] max-w-[400px] space-y-2">
      <MotionContainer animation="zoom-out">
        <Title>Reset Password</Title>
      </MotionContainer>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          className="mx-auto"
          type="submit"
          text="Sending reset instructions"
          loading={loading}
          disabled={loading}
        >
          <MdLockReset size={20} />
          <span>Reset Password</span>
        </Button>
      </form>

      <FlexBox className="gap-2">
        <Paragraph>Remember your password?</Paragraph>
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign Up
        </Link>
      </FlexBox>
    </FormContainer>
  );
};

export default ResetForm;
