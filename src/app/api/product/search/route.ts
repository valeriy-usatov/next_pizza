import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export async function GET(req: NextRequest) {
  // Извлекаем параметр 'query' из URL
  const query = req.nextUrl.searchParams.get("query") || "";

  if (query) {
    // Если параметр 'query' существует, ищем продукты по названию
    const products = await prisma.product.findMany({
      where: {
        name: {
          /* В данном коде name — это название поля в базе данных, связанное с объектами product. */
          contains: query, // Поиск продуктов, где название содержит значение 'query'
          mode: "insensitive", // Поиск без учета регистра
        },
      },
      take: 5, // Возвращай только 5 продуктов
    });

    // Возвращаем найденные продукты в ответе
    return NextResponse.json({ products });
  }

  // Если параметр 'query' не передан, возвращаем пустой массив
  return NextResponse.json({ products: [] });
}
