import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";

export const dynamic = "force-dynamic";

export async function GET() {
  const ingredients = await prisma.ingredient.findMany();

  return NextResponse.json(ingredients);
}
