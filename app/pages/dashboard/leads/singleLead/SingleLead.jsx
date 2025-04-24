import LeadHeader from "./leadComponents/LeadHeader";
import LeadCompanyInfo from "./leadComponents/LeadCompanyInfo";
import PersonContact from "./leadComponents/PersonContact";
import CompanyStats from "./leadComponents/CompanyStats";

const SingleLead = ({ data = {} }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 grid gap-4 ">
      <LeadHeader data={data} />
      <div className=" grid gap-4">
        <LeadCompanyInfo data={data} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PersonContact data={data} />
          <CompanyStats data={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleLead;
