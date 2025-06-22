import CardContainer from "app/components/containers/CardContainer";
import IconContainer from "app/components/containers/IconContainer";
import Paragraph from "app/components/Paragraph";
import SubTitle from "app/components/SubTitle";
import Title from "app/components/Title";
import { FaBriefcase, FaDollarSign, FaIndustry, FaUsers } from "react-icons/fa";

const CompanyStats = ({ data }) => {
  return (
    <CardContainer>
      <Title className="pb-3 border-bottom">Company Stats</Title>
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-3">
          <IconContainer size="md">
            <FaUsers />
          </IconContainer>
          <div>
            <SubTitle>Employees</SubTitle>
            <Paragraph>{data?.employees}</Paragraph>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconContainer size="md">
            <FaDollarSign />
          </IconContainer>
          <div>
            <SubTitle>Annual Revenue</SubTitle>
            <Paragraph>
              ${data?.annual_revenue?.toLocaleString() || "N/A"}
            </Paragraph>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconContainer size="md">
            <FaIndustry />
          </IconContainer>
          <div>
            <SubTitle>Industry</SubTitle>
            <Paragraph className="capitalize">{data?.industry}</Paragraph>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconContainer size="md">
            <FaBriefcase />
          </IconContainer>
          <div>
            <SubTitle>Location</SubTitle>
            <Paragraph>
              {data?.city}, {data?.state}, {data?.country}
            </Paragraph>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default CompanyStats;
