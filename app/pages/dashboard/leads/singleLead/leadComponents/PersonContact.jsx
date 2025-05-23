import SendEmailButton from "app/components/buttons/SendEmailButton";
import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import IconContainer from "app/components/containers/IconContainer";
import SubTitle from "app/components/SubTitle";
import Title from "app/components/Title";
import { FaLinkedin, FaPhone, FaUserTie } from "react-icons/fa";

const PersonContact = ({ data }) => {
  return (
    <CardContainer>
      <Title className="pb-3 border-b border-gray-200">Primary Contact</Title>
      <div className="space-y-4 mt-4">
        <FlexBox type="row-start" className="gap-2 items-center">
          <div>
            <IconContainer color="gold" size="sm">
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
        <div className="flex items-center gap-3 text-gray-700">
          <SendEmailButton lead={data} type="user" />
        </div>
        <div className="space-y-2 text-[14px]">
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone color="#22c74e" />
            <span>{data?.corporate_phone}</span>
          </div>
          {data?.person_linkedin_url && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaLinkedin color="blue" />
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
