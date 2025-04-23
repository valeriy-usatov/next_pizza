'use client';

import { useIntersection } from 'react-use';
import { useEffect, useRef, useState } from 'react';

import ProductCart from './ProductCart';
import { useCategoryStore } from '@/store/category';
import { useSearchStore } from '@/store/search';
import { Ingredient, Product, ProductItem } from '@prisma/client';

type ProductWithIngredients = Product & { ingredients: Ingredient[] };
interface Props {
  title: string;
  products: ProductWithIngredients[];
  categoryId: number;
  className?: string;
  ingredients?: Ingredient[];
  listClassName?: string;
}
const ProductsGroupList = ({
  title,
  products = [],
  listClassName,
  categoryId,
  ingredients,
  className,
}: Props) => {
  const setActiveCategoryId = useCategoryStore(
    (state) => state.setActiveId,
  ); /* из нашего стейта, вытаскиваем функцию setActiveId ,которую мы создали, эта функция будет при каждом вызове выполнять и обновлять ActiveId */
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4 /* событие будет срабатывать, когда 40% элемента будет видимо в области просмотра. */,
  });
  const { searchInput } = useSearchStore();
  const [productPrice, setProductPrice] = useState<ProductItem[]>([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/search?query=${searchInput}`,
          {
            cache: 'no-store',
          },
        );
        if (!res.ok) {
          throw new Error('Failed');
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchInput]);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, title]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/productItem`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setProductPrice(data); //
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <h2 className="font-extrabold text-3xl mb-7">{title}</h2>
      <div className={`grid grid-cols-3 gap-12 ${listClassName}`}>
        {products.map((product, index) => (
          <ProductCart
            key={product.id}
            id={product.id}
            title={product.name}
            price={
              (productPrice.find((item) => item.productId === product.id)?.price as number) || 0
            }
            imageUrl={product.imageUrl}
            ingredients={product?.ingredients as Ingredient[]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
