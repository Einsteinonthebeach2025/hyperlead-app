import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../config/paypalConfig";

export default function PayPalSubscriptionProvider({ children }) {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "subscription",
                vault: true,
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
}