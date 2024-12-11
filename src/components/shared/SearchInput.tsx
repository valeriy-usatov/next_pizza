'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { useDebounce } from 'react-use';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [isfocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Состояние для хранения данных

  // почти тоже самое что и useEffect, но с Задержкой обновления значения
  useDebounce(
    () => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/product/search?query=${search}`,
            {
              cache: 'no-store',
            },
          );
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          const data = await res.json();
          setProducts(data.products); // Сохраняем данные в состоянии
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    },
    200,
    [search],
  ); // Повторный вызов при изменении search

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
  };

  const onClickItem = () => {
    setIsFocused(false);
    setSearch('');
    setProducts([]);
  };
  return (
    <>
      {isfocused && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-30"
          onClick={() => setIsFocused(false)}
        ></div>
      )}
      <form
        className="flex gap-3 items-center bg-[#f9f9f9] flex-1 rounded-2xl p-4 h-11 relative z-40"
        onSubmit={getData}
      >
        <button className="cursor-pointer">
          <Image src="/search.svg" alt="Image" width={16} height={16} />
        </button>
        <input
          className="bg-transparent focus-visible:outline-none w-full py-3"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Поиск пиццы..."
          onFocus={() => setIsFocused(true)}
        />
        <div
          className={`absolute w-full bg-white rounded-xl py-2 top-14 left-0 shadow-md ${
            isfocused && search ? 'visible opacity-100 top-12' : 'invisible opacity-0'
          }`}
        >
          {products.length > 1 ? (
            products.map((product: { id: number; name: string; imageUrl: string }) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={onClickItem}
                className="flex gap-3 items-center py-1 px-3 hover:bg-primary/10 hover:rounded-md"
              >
                <Image src={product.imageUrl} alt={product.name} width={30} height={30} />
                <span>{product.name}</span>
              </Link>
            ))
          ) : (
            <h3 className="pl-4">К сожелению такого у нас нет</h3>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchInput;
