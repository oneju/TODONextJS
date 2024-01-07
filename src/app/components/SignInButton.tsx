"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import styled from "@emotion/styled";
import palette from "@/styles/palette";
function SignInButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Button onClick={() => signOut({ callbackUrl: "/signin" })}>
        logout
      </Button>
    );
  }
  return (
    <div className="space-x-10">
      <Button onClick={() => signIn()}>LogIn</Button>
    </div>
  );
}

export default SignInButton;
const Button = styled.button`
  border-radius: 1.5rem;
  background: #fff;
  color: ${palette.dark_gray};
  font-size: 1.25rem;
  padding: 0.5rem 1.5rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  :hover,
  :active {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;
