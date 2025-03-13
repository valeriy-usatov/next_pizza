import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prismaClient';

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {  /* Дай нам список категории, список продуктов, их ингредеенты */
        products: {
            include: {
                ingredients:true,
                items:true,
            }
        }
    }
});

  return NextResponse.json(categories);
}


