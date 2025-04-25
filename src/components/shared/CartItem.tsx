"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui';
import { Pizza, useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

const CartItem = ({ pizza, index }: { pizza: Pizza; index: number }) => {
  const { name, imageUrl, size, price, type, activeIngredients, count } = pizza;
  const { updatePizzaCount, removePizza } = useCartStore();
  const [isRemoved, setIsRemoved] = useState(false);

  const handleClickPlus = () => {
    if (count < 10) {
      updatePizzaCount(pizza.id, count + 1); // Передаём ID, а не name
    }
  };

  const handlePizzaRemove = () => {
    setIsRemoved(true); // Сначала меняем фон
    setTimeout(() => {
      removePizza(pizza.id); // Потом удаляем
      toast.success(`${name} удалена из корзины`);
    }, 300); // Задержка, чтобы фон успел обновиться
  };


  const handleClickMinus = () => {
    if (count > 1) {
      updatePizzaCount(pizza.id, count - 1); // Передаём ID, а не name
    }
  };

  const disabledMinus = count <= 1;
  const disabledPlus = count >= 10;
  return (
    <div className={`w-full p-8 relative transition-colors duration-300
    ${isRemoved ? 'bg-gray-200' : 'bg-white'}`}>
      <div
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={handlePizzaRemove}
      >
        <Trash2 size={16} />
      </div>
      <div className="flex gap-4">
        <div>
          <Image src={imageUrl} alt="Image" width={65} height={65} className="" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-6">{name}</h2>
            {!size && !type ? (
              ''
            ) : (
              <p className="text-sm text-gray-400">{`${
                size === 20 ? 'Маленькая' : size === 30 ? 'Средняя' : size === 40 ? 'Большая' : ''
              } ${size} см, ${
                type === 1 ? 'тонкое тесто' : type === 2 ? 'традиционное тесто' : ''
              } ${activeIngredients?.length ? `+ ${activeIngredients.join(', ')}` : ''}   `}</p>
            )}
          </div>
          <div className="border border-b-neutral-200"></div>
          <div className="flex justify-between -center">
            <div className="flex gap-3 items-center">
              <Button
                onClick={handleClickMinus}
                variant="outline"
                disabled={disabledMinus}
                className="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 h-8 w-8 rounded-[10px]"
              >
                <Minus className="" />
              </Button>
              <div>{count}</div>
              <Button
                onClick={handleClickPlus}
                variant="outline"
                disabled={disabledPlus}
                className="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 h-8 w-8 rounded-[10px]"
              >
                <Plus className="h4 w-4" />
              </Button>
            </div>
            <div className="font-bold">{price * count} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
