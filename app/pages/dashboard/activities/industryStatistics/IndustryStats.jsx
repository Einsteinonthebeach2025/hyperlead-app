import CardContainer from "app/components/containers/CardContainer";
import FlexBox from "app/components/containers/FlexBox";
import ContentHeadline from "app/components/ContentHeadline";
import SubTitle from "app/components/SubTitle";
import { FaBriefcase, FaGlobe, FaBuilding, FaChartBar, FaHeartbeat, FaShoppingCart, FaTools, FaMoneyBillWave, FaPlane, FaGavel, FaCamera, FaTruck, FaUserTie } from "react-icons/fa";

const iconMap = {
  "marketing & advertising": <FaChartBar />,
  "e-commerce": <FaShoppingCart />,
  "information technology": <FaTools />,
  "legal services": <FaGavel />,
  "entertainment": <FaCamera />,
  "saas": <FaGlobe />,
  "real estate": <FaBuilding />,
  "construction": <FaTools />,
  "manufacturing": <FaBuilding />,
  "wellness & fitness": <FaHeartbeat />,
  "coach & consulting": <FaUserTie />,
  "hospitality": <FaPlane />,
  "financial services": <FaMoneyBillWave />,
  "logistics": <FaTruck />,
  "retail": <FaShoppingCart />,
  "media": <FaShoppingCart />
};

const colClassMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const IndustryStats = ({ data, col }) => {

  return (
    <CardContainer className="space-y-4">
      <ContentHeadline
        className="border-bottom"
        type="column-start"
        title="Lead Breakdown by Industry"
        desc="See how your leads are distributed across selected industries."
      />
      <div className={`grid ${colClassMap[col] || "grid-cols-2"} gap-3`}>
        {data &&
          Object.entries(data).map(([industry, count]) => (
            <FlexBox
              type="column"
              key={industry}
              className="p-2 bg-blue-100/50 dark:bg-blue-900/50 rounded-xl"
            >
              <FlexBox type="column">
                <SubTitle>{industry}</SubTitle>
                <FlexBox type="row-between" className="gap-2 items-center text-blue-500">
                  <div className="text-lg">{iconMap[industry] || <FaBriefcase />}</div>
                  <h1 className="font-bold">{count.toLocaleString()}</h1>
                </FlexBox>
              </FlexBox>

            </FlexBox>
          ))}
      </div>
    </CardContainer>
  );
};

export default IndustryStats;

