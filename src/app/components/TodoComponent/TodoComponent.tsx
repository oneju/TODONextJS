import styled from "@emotion/styled";
const TodoComponent = ({ content }: { content: string }) => {
  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};
export default TodoComponent;

const Container = styled.div``;
const Content = styled.p`
  font-size: 3rem;
`;
