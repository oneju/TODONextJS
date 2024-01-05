import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

interface RequestBody {
  content: string;
}
export async function GET() {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos));
}

export async function POST(req: Request, res: NextResponse) {
  try {
    const { data } = await req.json();
    await prisma.todo.create({ data: { content: data } });
    return NextResponse.json(data);
  } catch (error) {
    return res.json();
  }
}
