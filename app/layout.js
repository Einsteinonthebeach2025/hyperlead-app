import "./globals.css";
import Footer from "./layout/footer/Footer";
import SideBar from "./layout/navigation/side/SideBar";
import AuthProvider from "./lib/store/AuthProvider";
import EmailModal from "./pages/modals/emailModal/EmailModal";
import NavigationWrapper from "./layout/navigation/nav/NavigationWrapper";
import ErrorMsg from "./components/modals/ErrorMsg";
import SendNotificationModal from "./pages/modals/notificationModal/SendNotificationModal";
import GlobalModal from "./components/modals/GlobalModal";
import ThemeProvider from "./lib/store/ThemeProvider";
import ExtraLeadOptions from "./pages/dashboard/dashboardSide/extraLeads/ExtraLeadOptions";
import PayPalProviderWrapper from "./lib/store/PaypalProviderWrapper";
import TransactionsData from "./pages/adminPanel/userManagement/list/components/userTransactions/TransactionsData";
import PayPalPaymentModal from "./components/modals/paypalModal/PayPalPaymentModal";
import { StoreProvider } from "./lib/store/StoreProvider";
import { Inter_Tight } from "next/font/google";
import HyperSearchModal from "./components/modals/hyperSearchModal/HyperSearchModal";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Welcome to Hyperlead",
  description:
    "Platform for creating and managing your leads, contacts, and more.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <html lang="en" className={interTight.className}>
          <ThemeProvider>
            <body className="center flex-col">
              <PayPalProviderWrapper>
                <main className="relative w-full max-w-[1650px] dark:bg-[#151e27] duration-500">
                  <NavigationWrapper />
                  {children}
                  <ErrorMsg />
                  <SideBar />
                  <EmailModal />
                  <GlobalModal />
                  <SendNotificationModal />
                  <TransactionsData />
                  <ExtraLeadOptions />
                  <PayPalPaymentModal />
                  <HyperSearchModal />
                  <Footer />
                </main>
              </PayPalProviderWrapper>
            </body>
          </ThemeProvider>
        </html>
      </AuthProvider>
    </StoreProvider>
  );
}
