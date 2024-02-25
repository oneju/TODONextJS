"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Props {
  session: Session | null;
  children: ReactNode;
}
function Providers({ children, session }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/todo')
    }
  })
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;
