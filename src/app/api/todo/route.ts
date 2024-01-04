import type { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import { useSession } from "next-auth/react";

interface RequestBody {
  content: string;
}
export async function GET() {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos));
}

export async function POST(req: any) {
  const { data } = await req.json();
  await prisma.todo.create({ data: { content: data } });
}
