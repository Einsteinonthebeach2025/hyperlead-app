import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import Title from "app/components/Title";
import { FaEnvelope, FaLinkedin, FaPhone, FaUserTie } from "react-icons/fa";

const PersonContact = ({ data }) => {
  return (
    <CardContainer>
      <Title className="pb-3 border-b border-gray-200">Primary Contact</Title>
      <div className="space-y-4 mt-4">
        <FlexBox type="row-2">
          <div>
            <IconContainer size="sm">
              <FaUserTie size={20} />
            </IconContainer>
          </div>
          <div>
            <SubTitle>
              {data?.first_name} {data?.last_name}
            </SubTitle>
            <p className="text-[12px] text-neutral-600">{data?.person_title}</p>
          </div>
        </FlexBox>
        <div className="space-y-2 text-[14px] [&_svg]:text-blue-600">
          {data?.email && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope />
              <a className="hover:underline" href={`mailto:${data?.email}`}>
                {data?.email}
              </a>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone />
            <span>{data?.corporate_phone}</span>
          </div>
          {data?.person_linkedin_url && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaLinkedin />
              <a
                href={data?.person_linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold italic hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
};

export default PersonContact;
