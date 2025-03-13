import { prisma } from '../../prisma/prismaClient';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  // Получаем размеры и типы пиццы как строки
  // const sizes = params.sizes?.split(',');
  const sizes = params.sizes
    ? params.sizes
        .split(',')
        .map(Number)
        .filter((size) => !isNaN(size))
    : undefined;
  // const pizzaTypes = params.pizzaTypes?.split(',');
  const pizzaTypes = params.pizzaTypes
    ? params.pizzaTypes
        .split(',')
        .map(Number)
        .filter((type) => !isNaN(type))
    : undefined;

  // Получаем имена ингредиентов
  const ingredientNames = params.ingredients?.split(',');

  // Получаем диапазон цен
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc', // Сортировка по id в порядке убывания
        },
        where: {
          // Фильтрация по ингредиентам (по именам)
          ingredients:
            ingredientNames && ingredientNames.length > 0
              ? {
                  some: {
                    name: {
                      in: ingredientNames,
                    },
                  },
                }
              : undefined,

          // Фильтрация по размерам и типам пиццы (по названиям)
          items: {
            some: {
              size:
                sizes && sizes.length > 0
                  ? {
                      in: sizes, // Фильтруем по названиям размеров
                    }
                  : undefined,
              pizzaType:
                pizzaTypes && pizzaTypes.length > 0
                  ? {
                      in: pizzaTypes, // Фильтруем по названиям типов
                    }
                  : undefined,
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return categories;
};
