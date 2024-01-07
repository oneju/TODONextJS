import React from "react";
import { SyncLoader } from "react-spinners";
import styled from "@emotion/styled";
const Loading = () => {
  return (
    <Container>
      <h2>Loading</h2>
      <SyncLoader />
    </Container>
  );
};
export default Loading;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
