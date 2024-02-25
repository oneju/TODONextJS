"use client";
import palette from "@/styles/palette";
import styled from "@emotion/styled";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isError, setIsError] = useState('');

  
  const emailValidChk = () => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    return pattern.test(emailRef.current?emailRef.current:'');
  }

  const handleSubmit = async () => {
    if (!emailValidChk() || !nameRef.current || !emailRef.current || !passwordRef.current)
      return setIsError('입력값을 확인해주세요.');
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
      .then((res) => res);
    if (res.data) return router.push('/auth/signin');
    else {
      setIsError('중복된 이메일입니다.')
    }
  };

  return (
    <SignupContainer>
      <Title>Sign Up</Title>
      <Container>
        <Input
          ref={nameRef}
          onChange={(e: any) => { setIsError(''); return (nameRef.current = e.target.value)}}
          id="name"
          name="name"
          type="string"
          autoFocus={true}
          placeholder="enter nickname"
          required
        ></Input>
        <Input
          ref={emailRef}
          onChange={(e: any) => { setIsError(''); return (emailRef.current = e.target.value)}}
          id="email"
          name="email"
          type="email"
          required
          placeholder="enter email"
        ></Input>
        <Input
          ref={passwordRef}
          onChange={(e: any) => { setIsError(''); return (passwordRef.current = e.target.value)}}
          id="password"
          name="password"
          type="password"
          placeholder="enter password"
          required
        ></Input>
        <ErrorMsg>{isError}</ErrorMsg>
        <Button onClick={handleSubmit}>Join</Button>
        <Link href="/auth/signin">Log in</Link>
      </Container>
    </SignupContainer>
  );
};
export default Signup;
const SignupContainer = styled.main`
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
const ErrorMsg = styled.p`
  color:${palette.red};
  height: 1rem;
  font-size: 0.7rem;
  margin-bottom: 1rem;
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
const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 30%;
`;
