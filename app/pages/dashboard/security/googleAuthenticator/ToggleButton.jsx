import FlexBox from 'app/components/containers/FlexBox';
import ToggleSwitch from 'app/components/ToggleSwitch'
import supabase from 'app/lib/config/supabaseClient'

const ToggleButton = ({
  factor,
  enrolling,
  loading,
  setFactor,
  setQrCode,
  setCode,
  setEnrolling,
  setLoading
}) => {
  const twoFaEnabled = !!factor && factor.status === "verified";

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

  const disable2FA = async () => {
    setLoading(true);
    try {
      if (!factor?.id) {
        return;
      }
      const { error } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
      if (error) {
      } else {
        setFactor(null);
        setQrCode("");
        setCode && setCode("");
        setEnrolling(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (loading) return;
    if (twoFaEnabled) {
      await disable2FA();
    } else {
      await startEnrollment();
    }
  };

  return (
    <FlexBox type="row-between" className="gap-1">
      <ToggleSwitch
        checked={twoFaEnabled}
        onChange={handleToggle}
        color={twoFaEnabled ? "#4CAF50" : "#ccc"}
        disabled={loading}
      />
      <span className='font-medium text-blue-500 ml-3'>
        {twoFaEnabled ? "Disable 2FA" : "Enable 2FA"}
      </span>
    </FlexBox>
  )
}

export default ToggleButton