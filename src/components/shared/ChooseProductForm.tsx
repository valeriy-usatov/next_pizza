import React from 'react';
import PizzaImage from './PizzaImage';
import { Button } from '../ui';
import Image from 'next/image';

interface Props {
  imageUrl: string;
  name: string;
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

const ChooseProductForm = ({ name, imageUrl, loading, onSubmit, className }: Props) => {
  const textDetaills = '25 см, традиционное тесто 25, 380 г';
  const totalPrice = 350;
  return (
    <div className="flex flex-1">
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={350}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
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

export default ChooseProductForm;
