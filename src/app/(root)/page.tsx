import { Container } from "@/components/shared/Container";
import Filters from "@/components/shared/Filters";
import ProductsGroupList from "@/components/shared/ProductsGroupList";

import TopBar from "@/components/shared/TopBar";

import { findPizzas, GetSearchParams } from "@/lib/findPizzas";
import { Category, Ingredient, Product } from "@prisma/client";
import { Stories } from "../../components/shared/Stories";

export type ProductWithIngredients = Product & { ingredients: Ingredient[] };
export type CategoryWithProducts = Category & {
  products: ProductWithIngredients[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <h1 className="lg:text-lg xl:text-3xl 2xl:text-4xl font-bold">
          Все пиццы
        </h1>
        <TopBar />
        <Stories />
        <div className="flex gap-20 mt-10">
          {/* ФИЛЬТРАЦИЯ */}
          <div className="w-1/4">
            <Filters />
          </div>
          {/* СПИСОК ТОВАРОВ */}
          <div className="w-3/4">
            {categories.map(
              (category: CategoryWithProducts) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    // ingredients={category.products[0].ingredients}
                    listClassName=""
                    categoryId={category.id}
                    className="mb-16"
                  />
                ),
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
