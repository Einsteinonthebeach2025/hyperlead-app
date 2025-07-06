import CardContainer from "app/components/containers/CardContainer";
import EmployeesList from "./EmployeesList";
import ContentHeadline from "app/components/ContentHeadline";

const EmployeeStats = ({ data = {} }) => {

  return (
    <CardContainer>
      <ContentHeadline
        type="column-start"
        title="Top Employees"
        desc="Analyzing employee size trends across your lead portfolio"
      />
      <EmployeesList data={data} />
    </CardContainer>
  );
};

export default EmployeeStats;
