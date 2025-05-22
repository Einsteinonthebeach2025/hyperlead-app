import IconContainer from "app/components/containers/IconContainer";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const ProfileSocialLinks = ({ profile }) => {
  const socialLinks = [
    {
      icon: <FaLinkedin />,
      href: profile?.linkedin_url,
    },
    {
      icon: <FaTwitter />,
      href: profile?.twitter_url,
    },
    {
      icon: <TbWorld />,
      href: profile?.web_url,
    },
  ].filter((link) => link.href);

  return (
    <div className="items-center flex gap-2 text-2xl">
      {socialLinks.map((link) => (
        <IconContainer key={link.href} href={link.href} size="sm">{link.icon}</IconContainer>
      ))}
    </div>
  );
};

export default ProfileSocialLinks;
