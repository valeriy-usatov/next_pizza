import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";
export const dynamic = "force-dynamic";

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });

  return NextResponse.json(stories);
}
