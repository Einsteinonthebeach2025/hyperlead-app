import CardContainer from "app/components/containers/CardContainer";
import FormContainer from "app/components/containers/FormContainer";
import SpanContainer from "app/components/containers/SpanContainer";
import React from "react";

const TestCom = () => {
  return (
    <div className="h-screen center gap-4">
      <CardContainer type="green">
        <h1>hello world</h1>
      </CardContainer>
      <FormContainer>
        <h1>hello world</h1>
      </FormContainer>
      <SpanContainer color="green">
        <h1>hello world</h1>
      </SpanContainer>
    </div>
  );
};

export default TestCom;
