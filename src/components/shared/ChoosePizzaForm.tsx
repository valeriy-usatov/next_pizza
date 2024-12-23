import React from 'react';
import { Button } from '../ui';
import Image from 'next/image';
import PizzaImage from './PizzaImage';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

const ChoosePizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}: Props) => {
  const textDetaills = '25 см, традиционное тесто 25, 380 г';
  const totalPrice = 350;
  const size = 30;
  
  return (
    <div className="flex flex-1">
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
      <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{name}</h2>
      <p className="text-gray-400">{textDetaills}</p>
      <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
        Добавить в корзину за {totalPrice} ₽
      </Button>

      </div>
    </div>
  );
};

export default ChoosePizzaForm;
