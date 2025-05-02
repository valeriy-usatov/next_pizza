import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";
export const dynamic = "force-dynamic";

// GET SINGLE PRODUCT

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 },
    );
    // второй вариант
    // return new NextResponse(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 },
      );
    }
    return NextResponse.json({ product });
    // return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
    // return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
  }
};
