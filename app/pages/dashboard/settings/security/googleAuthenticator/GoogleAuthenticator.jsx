"use client"
import { useEffect, useState, useRef } from "react";
import supabase from "app/lib/config/supabaseClient";
import CardContainer from "app/components/containers/CardContainer";
import ContentHeadline from "app/components/ContentHeadline";
import ToggleButton from "./ToggleButton";
import EnrollingQr from "./EnrollingQr";
import MidInfo from "./MidInfo";

const GoogleAuthenticator = () => {
  const [factor, setFactor] = useState(null); // Current TOTP factor (verified or unverified)
  const [enrolling, setEnrolling] = useState(false); // Are we enrolling?
  const [qrCode, setQrCode] = useState(""); // QR code data
  const [code, setCode] = useState(""); // User input code
  const [loading, setLoading] = useState(true); // Loading state - start as true
  const hasLoadedFactors = useRef(false); // Track if we've successfully loaded factors

  useEffect(() => {
    const loadFactors = async () => {
      try {
        const { data, error } = await supabase.auth.mfa.listFactors();

        if (error) {
          console.error("Error loading MFA factors:", error);
          // Only reset state if we haven't successfully loaded factors before
          if (!hasLoadedFactors.current) {
            setFactor(null);
            setEnrolling(false);
            setQrCode("");
          }
          return;
        }

        const unverifiedTotp = data?.all?.find(
          (f) => f.factor_type === "totp" && f.status === "unverified"
        );
        if (unverifiedTotp) {
          setFactor(unverifiedTotp);
          setEnrolling(true);
          setQrCode(unverifiedTotp.totp?.qr_code || unverifiedTotp.totp?.uri || "");
          hasLoadedFactors.current = true;
          return;
        }

        const verifiedTotp = data?.all?.find(
          (f) => f.factor_type === "totp" && f.status === "verified"
        );
        if (verifiedTotp) {
          setFactor(verifiedTotp);
          setEnrolling(false);
          setQrCode("");
          hasLoadedFactors.current = true;
          return;
        }

        // No TOTP factors found
        setFactor(null);
        setEnrolling(false);
        setQrCode("");
        hasLoadedFactors.current = true;
      } catch (err) {
        console.error("Unexpected error loading MFA factors:", err);
        // Only reset state if we haven't successfully loaded factors before
        if (!hasLoadedFactors.current) {
          setFactor(null);
          setEnrolling(false);
          setQrCode("");
        }
      } finally {
        setLoading(false);
      }
    };

    loadFactors();
  }, []);

  return (
    <CardContainer className="space-y-2 w-full lg:w-2/4">
      <ContentHeadline
        className=""
        type="column-start"
        title="Two-Factor Authentication"
        desc="Secure your account with an extra layer of protection. When enabled, you'll be required to enter a one-time code sent to your email or device each time you log in."
      />
      <MidInfo />
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