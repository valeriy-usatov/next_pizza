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
import { getCategories } from '@/lib/getCategories';

export default async function Home() {
  const categories = await getCategories();

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
              (category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    listClassName=""
                    categoryId={category.id}
                    className="mb-16"
                  />
                ),
            )}
          </div>
          {/* <Counter/> */}
        </div>
      </Container>
    </>
  );
}
