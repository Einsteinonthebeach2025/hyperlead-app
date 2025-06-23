import SubTitle from "app/components/SubTitle";

const LeadsNaming = () => {
  return (
    <div className="grid grid-cols-[1.7fr_0.5fr_1.2fr_1.5fr_0.8fr] gap-3 mt-2 rounded-lg *:font-light px-5">
      <SubTitle className="text-start">Name</SubTitle>
      <SubTitle className="text-start">Title</SubTitle>
      <SubTitle className="text-start">Company</SubTitle>
      <SubTitle className="">Industry</SubTitle>
      <SubTitle className="">Actions</SubTitle>
    </div>
  );
};

export default LeadsNaming;
