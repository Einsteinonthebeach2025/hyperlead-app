"use client"
import { useEffect, useState } from "react";
import supabase from "app/lib/config/supabaseClient";
import CardContainer from "app/components/containers/CardContainer";
import ContentHeadline from "app/components/ContentHeadline";
import ToggleButton from "./ToggleButton";
import EnrollingQr from "./EnrollingQr";

const GoogleAuthenticator = () => {
  const [factor, setFactor] = useState(null); // Current TOTP factor (verified or unverified)
  const [enrolling, setEnrolling] = useState(false); // Are we enrolling?
  const [qrCode, setQrCode] = useState(""); // QR code data
  const [code, setCode] = useState(""); // User input code
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const loadFactors = async () => {
      try {
        const { data, error } = await supabase.auth.mfa.listFactors();
        if (error) {
          setFactor(null);
          setEnrolling(false);
          setQrCode("");
          return;
        }
        const unverifiedTotp = data?.all?.find(
          (f) => f.factor_type === "totp" && f.status === "unverified"
        );
        if (unverifiedTotp) {
          setFactor(unverifiedTotp);
          setEnrolling(true);
          setQrCode(unverifiedTotp.totp?.qr_code || unverifiedTotp.totp?.uri || "");
          return;
        }
        const verifiedTotp = data?.all?.find(
          (f) => f.factor_type === "totp" && f.status === "verified"
        );
        if (verifiedTotp) {
          setFactor(verifiedTotp);
          setEnrolling(false);
          setQrCode("");
          return;
        }
        setFactor(null);
        setEnrolling(false);
        setQrCode("");
      } finally {
        setLoading(false);
      }
    };
    loadFactors();
  }, [])



  return (
    <CardContainer className="space-y-2 w-full lg:w-fit">
      <ContentHeadline
        type="column-start"
        title="Two-Factor Authentication"
        desc="Enable 2FA to secure your account"
      />
      <ToggleButton
        factor={factor}
        enrolling={enrolling}
        loading={loading}
        setFactor={setFactor}
        setQrCode={setQrCode}
        setCode={setCode}
        setEnrolling={setEnrolling}
        setLoading={setLoading}
      />
      <EnrollingQr
        enrolling={enrolling}
        qrCode={qrCode}
        code={code}
        setCode={setCode}
        factor={factor}
        loading={loading}
        setFactor={setFactor}
        setQrCode={setQrCode}
        setEnrolling={setEnrolling}
        setLoading={setLoading}
      />
    </CardContainer>
  );
};

export default GoogleAuthenticator;