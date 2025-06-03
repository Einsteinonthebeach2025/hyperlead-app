import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import Title from "app/components/Title";
import SubTitle from "app/components/SubTitle";

const InfoRow = ({ icon: Icon, content, isLink }) => {
  if (!content) return null;
  return (
    <FlexBox type="row-start" className="gap-2 items-center">
      <Icon className="text-blue-500" />
      {isLink ? (
        <a href={isLink} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <span>{content}</span>
      )}
    </FlexBox>
  );
};

const LeadCompanyInfo = ({ data = {} }) => {
  const { company_address, website, email, company_phone } = data;

  return (
    <CardContainer className="flex items-start flex-col space-y-6 [&_span]:text-[13px] [&_a]:text-[13px] [&_a]:hover:underline">
      <FlexBox type="column-start" className="w-full">
        <Title className="border-bottomw-full">
          Company Information
        </Title>
        <div className="w-full mt-1">
          <SubTitle>Social Links</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4 w-full">
            <InfoRow icon={FaMapMarkerAlt} content={company_address} />
            <InfoRow icon={FaGlobe} content="Visit our page" isLink={website} />
            <InfoRow icon={FaEnvelope} content="Contact Us" isLink={`mailto:${email}`} />
            <InfoRow icon={FaPhone} content={company_phone} />
          </div>
        </div>
      </FlexBox>
      <SocialLinks data={data} />
    </CardContainer>
  );
};

export default LeadCompanyInfo;
