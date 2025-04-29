import Button from "app/components/buttons/Button";
import CardContainer from "app/components/containers/CardContainer";
import Title from "app/components/Title";

const DashboardPreferences = ({ data }) => {
  return (
    <div className="py-4 h-screen lg:pr-8">
      <div className="grid grid-cols-3 gap-4">
        {data &&
          Object.entries(data).map(([preference, count]) => (
            <CardContainer
              type="blue"
              className="flex-col capitalize"
              key={preference}
            >
              <Title>{preference}</Title>
              <h1>{count}</h1>
            </CardContainer>
          ))}
      </div>
    </div>
  );
};

export default DashboardPreferences;
