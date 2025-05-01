import CardContainer from "app/components/containers/CardContainer";
import EmployeesList from "./EmployeesList";
import Title from "app/components/Title";

const EmployeeStats = ({ data = {} }) => {
  return (
    <CardContainer>
      <Title>Top Employees</Title>
      <EmployeesList data={data} />
    </CardContainer>
  );
};

export default EmployeeStats;
