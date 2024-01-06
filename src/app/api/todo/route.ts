import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request, res: NextResponse) {
  try {
    const { data } = await req.json();

    if (data.function === "read") {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
        select: {
          todos: {
            select: {
              id: true,
              content: true,
              checked: true,
            },
          },
        },
      });
      return NextResponse.json(user?.todos);
    }

    if (data.function === "create") {
      const todo = {
        content: data.content,
        checked: false,
        publisherId: data.user,
      };
      await prisma.todo.create({ data: todo });
      return NextResponse.json(data);
    }
    if (data.function === "update") {
      const todo = {
        content: data.todo.content,
        checked: data.todo.checked === "true" ? true : false,
      };
      await prisma.todo.update({
        where: {
          id: data.todo.id,
        },
        data: todo,
      });
      return NextResponse.json(data);
    }
    if (data.function === "delete") {
      await prisma.todo.delete({
        where: {
          id: data.id,
        },
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
