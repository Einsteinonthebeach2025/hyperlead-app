"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../config/paypalConfig";

export default function PayPalProviderWrapper({ children }) {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
}