"use client";
import styled from "@emotion/styled";
import SignOutButton from "../SignOutButton";
import { useSession } from "next-auth/react";
const TodoHeader = () => {
  const { data: session } = useSession();
  const user = session?.user.name;

  return (
    <Container>
      <Nickname>{user}의 TO-DO</Nickname>
      <SignOutButton />
    </Container>
  );
};
export default TodoHeader;
const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1.5rem;
`;
const Nickname = styled.h1``;
