import { prisma } from "../../prisma/prismaClient";

export const getCategories = async () => {
    return await prisma.category.findMany({
      include: {  /* Дай нам список категории, список продуктов, их ингредеенты */
        products: {
          include: {
            ingredients: true,
            items: true,
          },
        },
      },
    });
  };