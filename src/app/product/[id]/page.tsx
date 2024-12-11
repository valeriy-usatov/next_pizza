'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui';
import { pizzaSizes, pizzaTypes } from '../../../../prisma/constant';
import { Product } from '@prisma/client';

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeTypes, setActiveTypes] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);

  console.log(product?.name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setProduct(data.product); // Сохраняем данные в состоянии
        console.log(data.product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-10">
      <div className="flex gap-12">
        <div className="relative bg-secondary rounded-md p-9">
          {product?.imageUrl && (
            <Image src={product.imageUrl} alt="Image" width={500} height={500} />
          )}
          {/* <Image src={product?.imageUrl} alt="Image" width={500} height={500} /> */}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{product?.name}</h2>
            <p className="text-sm text-[#373737] opacity-60">25 см, традиционное тесто 25, 380 г</p>
          </div>
          {/* PizzaSizes */}
          <div className="grid grid-cols-3 bg-gray-200 w-[420px] p-1 rounded-3xl">
            {pizzaSizes.map((size, index) => (
              <span
                key={size}
                className={`text-center p-2 cursor-pointer ${
                  activeSize === index ? 'bg-white rounded-3xl py-2' : ''
                }`}
                onClick={() => setActiveSize(index)}
              >
                {size}
              </span>
            ))}
          </div>
          {/* PizzaTypes */}
          <div className="grid grid-cols-2 bg-gray-200 w-[420px] p-1 rounded-3xl">
            {pizzaTypes.map((size, index) => (
              <span
                key={size.text}
                className={`text-center p-2 cursor-pointer ${
                  activeTypes === index ? 'bg-white rounded-3xl py-2' : ''
                }`}
                onClick={() => setActiveTypes(index)}
              >
                {size.text}
              </span>
            ))}
          </div>
          {/* ingredients */}
          <div>
            <h3 className="text-lg font-semibold">Ингредиенты</h3>
            <div className="flex flex-col p-2 w-[130px]">
              <Image
                src="https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796"
                alt="Image"
                width={110}
                height={110}
              />
              <h3 className="text-center text-xs mt-1">Сырный бортик</h3>
              <p className="text-center text-sm font-semibold mt-5">179 ₽</p>
            </div>
          </div>
          <Button>Добавить в корзину за 799₽</Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
