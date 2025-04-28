import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";
import { authOptions } from "../../../../lib/authOptions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Вы не авторизованы" },
        { status: 401 },
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "[USER_GET] Server error" },
      { status: 500 },
    );
  }
}
