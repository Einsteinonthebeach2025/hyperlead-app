import FlexBox from "app/components/containers/FlexBox";
import IconContainer from "app/components/containers/IconContainer";
import SubTitle from "app/components/SubTitle";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinks = ({ data }) => {
  return (
    <FlexBox type="column-start">
      <SubTitle>Social Links</SubTitle>
      <FlexBox className="w-fit space-x-2">
        {data?.company_linkedin_url && (
          <IconContainer href={data?.company_linkedin_url} size="sm">
            <FaLinkedin />
          </IconContainer>
        )}
        {data?.twitter_url && (
          <IconContainer href={data?.twitter_url} size="sm">
            <FaTwitter />
          </IconContainer>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default SocialLinks;
