"use client";
import styled from "@emotion/styled";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRef } from "react";
const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    const res = await axios
      .post("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: nameRef.current,
          email: emailRef.current,
          password: passwordRef.current,
        },
      })
      .then((res) => {});
    signIn(undefined, { callbackUrl: "/" });
  };

  return (
    <SignupContainer>
      <h1>Sign Up</h1>
      <div>
        <input
          ref={nameRef}
          onChange={(e: any) => (nameRef.current = e.target.value)}
          id="name"
          name="name"
          type="string"
          autoFocus={true}
          placeholder="Nickname"
        ></input>
        <input
          ref={emailRef}
          onChange={(e: any) => (emailRef.current = e.target.value)}
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
        ></input>
        <input
          ref={passwordRef}
          onChange={(e: any) => (passwordRef.current = e.target.value)}
          id="password"
          name="password"
          type="password"
          placeholder="password"
        ></input>
        <button onClick={handleSubmit}>Join</button>
      </div>
    </SignupContainer>
  );
};
export default Signup;
const SignupContainer = styled.main``;
