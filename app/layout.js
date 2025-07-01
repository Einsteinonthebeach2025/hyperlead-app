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
import TransactionsData from "./pages/adminPanel/userManagement/list/components/userTransactions/TransactionsData";
import PayPalPaymentModal from "./components/modals/paypalModal/PayPalPaymentModal";
import { StoreProvider } from "./lib/store/StoreProvider";
import { Inter_Tight } from "next/font/google";
import HyperSearchModal from "./components/modals/hyperSearchModal/HyperSearchModal";
import ChatBot from "./pages/chatBot/ChatBot";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Welcome to Hyperlead | Lead Management Platform",
  description:
    "Hyperlead helps you create, manage, and grow your leads and contacts efficiently. Streamline your sales and marketing efforts with our powerful tools.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <html lang="en" className={interTight.className}>
          <ThemeProvider>
            <body className="center flex-col">
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
                <ChatBot />
                <Footer />
              </main>
            </body>
          </ThemeProvider>
        </html>
      </AuthProvider>
    </StoreProvider>
  );
}
