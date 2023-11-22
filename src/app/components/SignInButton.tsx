"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="space-x-10">
        <button onClick={() => signOut()}>
          {session.user?.name}님 Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="space-x-10">
      <button onClick={() => signIn()}>LogIn</button>
    </div>
  );
}

export default SignInButton;
