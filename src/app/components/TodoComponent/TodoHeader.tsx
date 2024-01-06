"use client";
import styled from "@emotion/styled";
import SignInButton from "../SignInButton";
import { useSession } from "next-auth/react";
const TodoHeader = () => {
  const { data: session } = useSession();
  const user = session?.user.name;

  return (
    <Container>
      <Nickname>{user}</Nickname>
      <SignInButton />
    </Container>
  );
};
export default TodoHeader;
const Container = styled.div`
  width: 80%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Nickname = styled.h1``;
