import SpanContainer from "app/components/containers/SpanContainer";
import SubTitle from "app/components/SubTitle";

const LeadsNaming = () => {
  return (
    <SpanContainer className="grid grid-cols-5 gap-4 mt-2 rounded-lg  *:font-light">
      <SubTitle className="text-start">Name</SubTitle>
      <SubTitle className="text-center pr-5">Title</SubTitle>
      <SubTitle className="text-start">Company</SubTitle>
      <SubTitle className="text-start pl-3">Location</SubTitle>
      <SubTitle className="text-start">Industry</SubTitle>
    </SpanContainer>
  );
};

export default LeadsNaming;
