import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";
export const dynamic = "force-dynamic";

export async function GET() {
  const productItem = await prisma.productItem.findMany();

  return NextResponse.json(productItem);
}
