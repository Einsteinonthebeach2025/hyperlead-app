import "./globals.css";
import Footer from "./layout/footer/Footer";
import SideBar from "./layout/navigation/side/SideBar";
import { StoreProvider } from "./lib/store/StoreProvider";
import AuthProvider from "./lib/store/AuthProvider";
import EmailModal from "./pages/modals/emailModal/EmailModal";
import NavigationWrapper from "./layout/navigation/nav/NavigationWrapper";
import ErrorMsg from "./components/modals/ErrorMsg";
import SendNotificationModal from "./pages/modals/notificationModal/SendNotificationModal";

export const metadata = {
  title: "Welcome to Hyperlead",
  description:
    "Platform for creating and managing your leads, contacts, and more.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <html lang="en">
          <body className="center flex-col">
            <main className="relative w-full max-w-[1650px]">
              <NavigationWrapper />
              {children}
              <ErrorMsg />
              <SideBar />
              <EmailModal />
              <SendNotificationModal />
              <Footer />
            </main>
          </body>
        </html>
      </AuthProvider>
    </StoreProvider>
  );
}
