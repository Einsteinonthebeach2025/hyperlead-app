import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import Title from "app/components/Title";

const LeadCompanyInfo = ({ data = {} }) => {
  const { company_address, website, email, company_phone } = data;
  return (
    <CardContainer className=" flex items-start flex-col space-y-6 [&_span]:text-[13px] [&_a]:text-[13px] [&_a]:hover:underline [&_svg]:text-blue-500">
      <FlexBox type="column-start" className="w-full">
        <Title className="border-b pb-1 border-gray-200 w-full">
          Company Information
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4 w-full">
          <FlexBox type="row-2">
            <FaMapMarkerAlt />
            <span>{company_address}</span>
          </FlexBox>
          <div className="flex items-center gap-3 text-gray-700">
            <FaGlobe />
            <a href={website} target="_blank" rel="noopener noreferrer">
              Visit our page
            </a>
          </div>
          <FlexBox type="row-2">
            <FaEnvelope />
            <a href={`mailto:${email}`}>Contact Us</a>
          </FlexBox>
          <FlexBox type="row-2">
            <FaPhone />
            <span>{company_phone}</span>
          </FlexBox>
        </div>
      </FlexBox>
      <SocialLinks data={data} />
    </CardContainer>
  );
};

export default LeadCompanyInfo;
