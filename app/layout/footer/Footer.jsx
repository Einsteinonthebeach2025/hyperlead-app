import Paragraph from "app/components/Paragraph";
import FooterLinks from "./components/FooterLinks";
import FooterSocialLinks from "./components/FooterSocialLinks";
import FooterSubscribe from "./components/FooterSubscribe";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col md:flex-row *:w-full px-3 py-10 lg:px-20 lg:py-20 relative bg-stone-100/70 dark:bg-[#1d2939] mt-10">
      <FooterSubscribe />
      <div>
        <FooterLinks />
        <FooterSocialLinks />
      </div>
      <div className="absolute w-full left-0 bottom-0 pb-2 center">
        <Paragraph>HyperLead. All right reserved. © 2025</Paragraph>
      </div>
    </footer>
  );
};

export default Footer;
