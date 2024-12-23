// 'use client';
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui';
// import { PizzaSizes, pizzaTypes } from '../../../../prisma/constant';
import { Product } from '@prisma/client';
import { notFound } from 'next/navigation';
import PizzaImage from '@/components/shared/PizzaImage';
import PizzaSize from '@/components/shared/PizzaSize';
import { prisma } from '../../../../../prisma/prismaClient';
import { pizzaSizeItems } from '@/data/constant';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!product) {
    console.error(`Product with ID ${params.id} not found`);
    return notFound();
  }

  const size = 30;

  return (
    <Container className="mt-10">
      <div className="flex gap-12">
        <PizzaImage imageUrl={product.imageUrl} size={size} name={product.name} />
        <div className="flex flex-col gap-6 w-[490px] bg-[#FCFCFC] p-7">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{product?.name}</h2>
            <p className="text-sm text-[#373737] opacity-60">25 см, традиционное тесто 25, 380 г</p>
          </div>
          {/* PizzaSizes */}
          <PizzaSize
            value="20"
            items={pizzaSizeItems}
          />

          <Button>Добавить в корзину за 799₽</Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
