import Categories from '@/components/shared/Categories';
import { Container } from '@/components/shared/Container';
import Filters from '@/components/shared/Filters';
import Header from '@/components/shared/Header';
import ProductCart from '@/components/shared/ProductCart';
import ProductsGroupList from '@/components/shared/ProductsGroupList';
import SortPopup from '@/components/shared/SortPopup';
import Counter from '@/components/shared/Template';

import TopBar from '@/components/shared/TopBar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { prisma } from '../../../prisma/prismaClient';
import { findPizzas, GetSearchParams } from '@/lib/findPizzas';
import Example from '@/components/shared/Example';
import { Category, Ingredient, Product } from '@prisma/client';

type CategoryProps = {};
// export type CategoryWithProducts = Category & { products: Product[] } ;
export type ProductWithIngredients = Product & { ingredients: Ingredient[] };
export type CategoryWithProducts = Category & { products: ProductWithIngredients[] };

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);
  console.log(categories);
  return (
    <>
      <Container className="mt-10">
        <h1 className="lg:text-lg xl:text-3xl 2xl:text-4xl font-bold">Все пиццы</h1>
        <TopBar />
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
