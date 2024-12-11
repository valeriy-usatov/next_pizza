'use client';

import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';

import ProductCart from './ProductCart';
import { useCategoryStore } from '@/store/category';
import { useSearchStore } from '@/store/search';

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}
const ProductsGroupList = ({ title, items = [], listClassName, categoryId, className }: Props) => {
  const setActiveCategoryId = useCategoryStore(
    (state) => state.setActiveId,
  ); /* из нашего стейта, вытаскиваем функцию setActiveId ,которую мы создали, эта функция будет при каждом вызове выполнять и обновлять ActiveId */
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4 /* событие будет срабатывать, когда 40% элемента будет видимо в области просмотра. */,
  });
  const { searchInput } = useSearchStore();
 
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

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <h2 className="font-extrabold text-3xl mb-7">{title}</h2>
      <div className={`grid grid-cols-3 gap-12 ${listClassName}`}>
        {items.map((product, index) => (
          <ProductCart
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
