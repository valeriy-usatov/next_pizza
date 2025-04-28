import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await prisma.user.create({
    data: body,
  });
  return NextResponse.json(user);
}

// NextResponse — это класс, предоставляемый Next.js для создания ответов на запросы. Это расширенная версия стандартного Response из Web API.

// req (request) представляет запрос, поступивший от клиента.
// Его тип NextRequest предоставляется Next.js. Это улучшенная версия стандартного Request из Web API.
