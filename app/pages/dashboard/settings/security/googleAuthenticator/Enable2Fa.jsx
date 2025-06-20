import Button from 'app/components/buttons/Button';
import supabase from 'app/lib/config/supabaseClient';
import { MdOutlineSecurity } from "react-icons/md";

const Enable2Fa = ({ factor, enrolling, loading, setFactor, setQrCode, setEnrolling, setLoading }) => {

  const startEnrollment = async () => {
    setEnrolling(true);
    setLoading(true);
    try {
      const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) {
        setEnrolling(false);
        return;
      }
      const unverifiedTotp = factorsData?.all?.find(
        (f) => f.factor_type === "totp" && f.status === "unverified"
      );
      if (unverifiedTotp) {
        setFactor(unverifiedTotp);
        setQrCode(unverifiedTotp.totp?.qr_code || unverifiedTotp.totp?.uri || "");
        setEnrolling(true);
        return;
      }
      const verifiedTotp = factorsData?.all?.find(
        (f) => f.factor_type === "totp" && f.status === "verified"
      );
      if (verifiedTotp) {
        setFactor(verifiedTotp);
        setEnrolling(false);
        setQrCode("");
        return;
      }
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
      console.log("[2FA] Enrollment response:", { data, error });
      if (error) {
        setEnrolling(false);
        return;
      }
      setFactor(data);
      setQrCode(data?.totp?.qr_code || data?.totp?.uri || "");
      setEnrolling(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!factor && !enrolling && (
        <div className="w-fit">
          <Button
            onClick={startEnrollment}
            disabled={loading}
            loading={loading}
          >
            <MdOutlineSecurity />
            <span>Enable 2FA</span>
          </Button>
        </div>
      )}
    </>
  )
}

export default Enable2Fa