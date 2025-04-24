import FlexBox from "app/components/containers/FlexBox";
import Paragraph from "app/components/Paragraph";
import SubscribeForm from "./SubscribeForm";
import Logo from "app/components/Logo";

const FooterSubscribe = () => {
  return (
    <FlexBox type="column-start">
      <Logo />
      <div>
        <SubscribeForm />
        <Paragraph>Stay updated with the latest news.</Paragraph>
      </div>
    </FlexBox>
  );
};

export default FooterSubscribe;
