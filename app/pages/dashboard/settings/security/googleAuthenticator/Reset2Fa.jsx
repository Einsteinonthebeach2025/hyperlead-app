import Button from 'app/components/buttons/Button';
import supabase from 'app/lib/config/supabaseClient';

const Reset2Fa = ({ loading, setLoading, setFactor, setQrCode, setCode, setEnrolling }) => {
  return (
    <Button
      type="blue"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase.auth.mfa.listFactors();
          if (error) {
            return;
          }
          const unverifiedFactors = data?.all?.filter(
            (f) => f.factor_type === "totp" && f.status === "unverified"
          ) || [];
          for (const f of unverifiedFactors) {
            console.log("[2FA] Reset: Unenrolling unverified factor:", f.id);
            await supabase.auth.mfa.unenroll({ factorId: f.id });
          }
          setFactor(null);
          setQrCode("");
          setCode("");
          setEnrolling(false);
        } finally {
          setLoading(false);
        }
      }}
    >
      Reset 2FA Setup
    </Button>
  )
}

export default Reset2Fa