import MotionChildren from "app/components/containers/MotionChildren";
import MotionContainer from "app/components/containers/MotionContainer";
import Link from "next/link";
import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";

const socLinks = [
  {
    icon: <FaFacebookSquare />,
    link: "/",
  },
  {
    icon: <FaTwitter />,
    link: "/",
  },
  {
    icon: <FaInstagram />,
    link: "/",
  },
];

const FooterSocialLinks = () => {
  return (
    <div className="flex justify-center lg:justify-end mt-5">
      <MotionContainer animation="zoom-out" className="flex space-x-5 ">
        {socLinks?.map((item, index) => {
          return (
            <MotionChildren animation="zoom-out" key={index}>
              <Link href={item.link}>
                <span className="text-neutral-500 text-2xl hover:text-black dark:text-stone-300 dark:hover:text-stone-100 duration-300">
                  {item.icon}
                </span>
              </Link>
            </MotionChildren>
          );
        })}
      </MotionContainer>
    </div>
  );
};

export default FooterSocialLinks;
