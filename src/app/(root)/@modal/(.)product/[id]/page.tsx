
import React, { useEffect, useState } from 'react';

import { notFound } from 'next/navigation';
import { prisma } from '../../../../../../prisma/prismaClient';
import ChooseProductModal from '@/components/shared/modal/ChooseProductModal';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}

