"use client";
import { useRouter } from "next/navigation";
import SignInButton from "./components/SignInButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) return router.push("/todo");
  return router.push("/signin");
}
