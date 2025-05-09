import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constant";
import { prisma } from "./prismaClient";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput; /* типизируем из Prisma.ProductItemUncheckedCreateInput */
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@mail.ru",
        password: hashSync("user", 10), // хэширование пароля выполняется для того, чтобы сохранить пароль в безопасной форме.
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@mail.ru",
        password: hashSync("admin", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ] /* параметр data всегда обязателен, потому что он определяет, какие данные будут добавлены в базу данных. Без него Prisma не знает, что именно записывать в таблицу.data — это ключевой параметр, который предоставляет массив объектов для массового создания записей. */,
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });
  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/pizza/Пепперони_фреш.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      } /* Это ключевая часть. Она задаёт связь (relation) между создаваемым продуктом и записями из таблицы ingredients. */,
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/pizza/Сырная.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/pizza/Чоризо_фреш.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // name: 'Пепперони фреш'
      {
        productId:
          pizza1.id /* В этом объекте есть поле id, которое было автоматически сгенерировано базой данных для этого нового продукта. Это значение pizza1.id будет равно уникальному идентификатору, который присваивается продукту в базе данных. */,
        pizzaType: 1,
        price: randomDecimalNumber(190, 600),
        size: 20,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 30,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 40,
      },
      // name: 'Сырная'
      {
        productId: pizza2.id,
        pizzaType: 1,
        price: randomDecimalNumber(190, 600),
        size: 20,
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        price: randomDecimalNumber(190, 600),
        size: 30,
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        price: randomDecimalNumber(190, 600),
        size: 40,
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 20,
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 30,
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 40,
      },
      // name: 'Чоризо фреш'
      {
        productId: pizza3.id,
        pizzaType: 1,
        price: randomDecimalNumber(190, 600),
        size: 20,
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 30,
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        price: randomDecimalNumber(190, 600),
        size: 40,
      },
      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "1111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "2222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`; // здесь sql запросы, чтобы у нас еще и id пользователей очищался, когда мы будем удалять таблицу. prisma.user.deleteManu() - здесь id не удаляется
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
