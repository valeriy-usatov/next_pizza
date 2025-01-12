

import Image from 'next/image';
import React  from 'react';
import { CircleCheck } from 'lucide-react';
interface ItemsProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
const IngredientItem = ({ className, active, price, name, imageUrl, onClick }: ItemsProps) => {
  return (
    <div
      className={`flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white' ${active ? 'border border-primary' : "" } ${className}`}
      onClick={onClick}
    >
        {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};

export default IngredientItem;
