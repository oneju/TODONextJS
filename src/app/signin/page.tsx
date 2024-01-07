"use client";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import styled from "@emotion/styled";
import palette from "@/styles/palette";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      username: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/todo",
    });
  };
  return (
    <LoginPage>
      <Title>나의 TO-DO</Title>
      <LoginContainer>
        <Input
          ref={emailRef}
          onChange={(e: any) => (emailRef.current = e.target.value)}
          id="email"
          name="email"
          type="email"
          required
          autoFocus={true}
          placeholder="enter your email"
        ></Input>
        <Input
          ref={passwordRef}
          onChange={(e: any) => (passwordRef.current = e.target.value)}
          id="password"
          name="password"
          type="password"
          placeholder="enter password"
        ></Input>

        <Button onClick={handleSubmit}>Log in</Button>
        <a href="/signup">sign Up</a>
      </LoginContainer>
    </LoginPage>
  );
};
export default Login;
const LoginPage = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: normal;

  border-radius: 3.7rem;
  background: ${palette.gray};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  width: 20rem;

  padding: 2rem 5rem;
  margin-bottom: 4rem;
`;
const Input = styled.input`
  color: ${palette.black};
  font-size: 1.25rem;
  text-align: center;
  padding-bottom: 2rem;

  ::placeholder {
    text-decoration-line: underline;
    color: ${palette.gray};
  }
`;
const Button = styled.button`
  border-radius: 2.5rem;
  background: ${palette.dark_gray};
  color: #fff;
  font-size: 1.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 1rem 2rem;
  :active {
    background: #cecece;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;
const LoginContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 30%;
`;
