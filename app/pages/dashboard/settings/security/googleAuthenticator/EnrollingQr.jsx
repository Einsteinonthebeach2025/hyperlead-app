import Button from 'app/components/buttons/Button';
import Reset2Fa from './Reset2Fa';
import MotionContainer from 'app/components/containers/MotionContainer';
import supabase from 'app/lib/config/supabaseClient';
import QrCode from './QrCode';
import Paragraph from 'app/components/Paragraph';

const EnrollingQr = ({ enrolling, qrCode, code, setCode, loading, setFactor, setQrCode, setEnrolling, setLoading, factor }) => {

  const verifyEnrollment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!factor?.id) {
        return;
      }
      // 1. Create a challenge for the TOTP factor
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: factor.id,
      });
      if (challengeError || !challengeData?.id) {
        return;
      }
      // 2. Verify the code with the challenge ID
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: challengeData.id,
        code,
      });
      if (verifyError) {
        console.error("[2FA] Verification error:", verifyError);
      } else {
        setCode("");
        setQrCode("");
        setEnrolling(false);

        const { data } = await supabase.auth.mfa.listFactors();
        const verifiedTotp = data?.all?.find(
          (f) => f.factor_type === "totp" && f.status === "verified"
        );
        setFactor(verifiedTotp || null);
      }
    } catch (e) {
      console.error("[2FA] Unexpected error during verification:", e);
    } finally {
      setLoading(false);
    }

  };


  return (
    <>
      {enrolling && (
        <MotionContainer animation="fade-in" className="fixed z-20 border backdrop-blur-md  center w-full top-0 left-0 h-screen flex-col">
          <Paragraph >Scan this QR code in your Authenticator app</Paragraph>
          <QrCode qrCode={qrCode} factor={factor} />
          <form onSubmit={verifyEnrollment} className="space-y-2 mb-2 center flex-col relative z-10">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              disabled={loading}
            />
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Verify and Enable 2FA
            </Button>
          </form>
          <Reset2Fa
            loading={loading}
            setLoading={setLoading}
            setFactor={setFactor}
            setQrCode={setQrCode}
            setCode={setCode}
            setEnrolling={setEnrolling} />
        </MotionContainer>
      )}
    </>
  )
}

export default EnrollingQr