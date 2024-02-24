"use client";
import { useSession } from "next-auth/react";
import { verifyJwt } from "../lib/jwt";
import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
    }) {
  const { data: session } = useSession();
  if (session){
    if (verifyJwt(session.user.accessToken))
      return redirect('/todo')
  }
    return (
        <div>
            {children}
        </div>
    );
}
