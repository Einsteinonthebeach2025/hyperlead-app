import CardContainer from "app/components/containers/CardContainer";
import EmployeesList from "./EmployeesList";
import ContentHeadline from "app/components/ContentHeadline";

const EmployeeStats = ({ data = {} }) => {
  return (
    <CardContainer>
      <ContentHeadline
        type="column-start"
        title="Top Employees"
        desc="According to leads"
      />
      <EmployeesList data={data} />
    </CardContainer>
  );
};

export default EmployeeStats;
