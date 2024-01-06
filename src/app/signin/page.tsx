"use client";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";

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
    <main>
      <h1>Login</h1>
      <div>
        <div>
          <input
            ref={emailRef}
            onChange={(e: any) => (emailRef.current = e.target.value)}
            id="email"
            name="email"
            type="email"
            required
            autoFocus={true}
            placeholder="Email"
          ></input>
        </div>
        <div>
          <input
            ref={passwordRef}
            onChange={(e: any) => (passwordRef.current = e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="password"
          ></input>
        </div>
        <button onClick={handleSubmit}>Log in</button>
        <a href="/signup">Sign Up</a>
      </div>
    </main>
  );
};
export default Login;
