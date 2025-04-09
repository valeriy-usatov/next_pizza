import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  title: string;
  price?: number;
  imageUrl: string;
  // ingredients: Ingredient[];
  className?: string;
  ingredients?: Ingredient[];
}

const ProductCart = ({ id, title, price = 500, imageUrl, className, ingredients }: Props) => {
  console.log("ingredients", ingredients)
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image src={imageUrl} alt="Image" width={215} height={215} />
        </div>
        <h2 className="font-bold mb-1 mt-3">{title}</h2>
        <p className="text-sm text-gray-400">
          {ingredients?.map((ing) => ing.name).join(', ')}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span>
            от <b>{price} ₽</b>{' '}
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCart;
