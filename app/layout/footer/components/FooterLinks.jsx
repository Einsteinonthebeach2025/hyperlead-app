"use client"
import SubTitle from "app/components/SubTitle";
import footerData from "app/localDB/footerData";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToggle } from "app/features/modalSlice";

const FooterLinks = () => {
  const dispatch = useDispatch();

  const handleModalLinkClick = (e, link) => {
    e.preventDefault();
    let modalData = {};

    if (link === "/terms-of-use") {
      modalData = {
        title: "HyperLead - Terms of Use",
        contentType: 'termsOfUse',
        size: '3xl'
      };
    } else if (link === "/privacy-policy") {
      modalData = {
        title: "HyperLead - Privacy Policy",
        contentType: 'privacyPolicy',
        size: '3xl'
      };
    }
    // Add other modal links here in the future, e.g., privacy policy

    dispatch(setToggle({
      modalType: 'global',
      isOpen: true,
      data: modalData
    }));
  };

  return (
    <div className="flex space-x-20 justify-center lg:justify-end my-10 lg:my-0">
      {footerData?.map((item) => {
        return (
          <div key={item.id}>
            <SubTitle className="capitalize text-center">{item.title}</SubTitle>
            <div className="center flex-col capitalize space-y-1 mt-4">
              {item.links.map((linkItem, index) => {
                if (linkItem.link === '/terms-of-use' || linkItem.link === '/privacy-policy') {
                  return (
                    <button
                      onClick={(e) => handleModalLinkClick(e, linkItem.link)}
                      key={index}
                      className="text-neutral-700 capitalize cursor-pointer hover:text-black dark:text-stone-300 dark:hover:text-stone-200 duration-300 text-sm"
                    >
                      <span>{linkItem.title}</span>
                    </button>
                  );
                }
                return (
                  <Link
                    className="text-neutral-700 hover:text-black dark:text-stone-300 dark:hover:text-stone-200 duration-300 text-sm"
                    href={linkItem.link}
                    key={index}
                  >
                    <span>{linkItem.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterLinks;
