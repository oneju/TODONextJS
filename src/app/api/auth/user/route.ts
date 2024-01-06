import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { body } = await request.json();
  const findUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (findUser) return new Response(JSON.stringify(null));

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });
  const { password, ...result } = user;
  const res = new Response(JSON.stringify(result));
  return res;
}
