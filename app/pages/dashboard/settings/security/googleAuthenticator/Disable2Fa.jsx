import Button from 'app/components/buttons/Button';
import Paragraph from 'app/components/Paragraph';
import supabase from 'app/lib/config/supabaseClient';

const Disable2Fa = ({ factor, enrolling, loading, setFactor, setQrCode, setCode, setEnrolling, setLoading }) => {

  const disable2FA = async () => {
    setLoading(true);
    try {
      if (!factor?.id) {
        return;
      }
      console.log("[2FA] Disabling factor with ID:", factor.id);
      const { error } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
      console.log("[2FA] Disable response:", { error });
      if (error) {
        console.error("[2FA] Disable error:", error);
      } else {
        setFactor(null);
        setQrCode("");
        setCode("");
        setEnrolling(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {factor && factor.status === "verified" && !enrolling && (
        <div>
          <Paragraph>2FA is enabled on your account</Paragraph>
          <Button
            type="blue"
            onClick={disable2FA}
            loading={loading}
            disabled={loading}
          >
            Disable 2FA
          </Button>
        </div>
      )}</>
  )
}

export default Disable2Fa