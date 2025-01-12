import Image from 'next/image';
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui';

const CartItem = () => {
  return (
    <div className="-mx-6 bg-white p-8">
      <div className="flex gap-6">
        <div>
          <Image src="/pizza/Сырная.webp" alt="Image" width={65} height={65} className="" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-6">Чизбургер-пицца</h2>
            <p className="text-sm text-gray-400">Средняя 30 см, традиционное тесто</p>
          </div>
          <div className="border border-b-neutral-200"></div>
          <div className="flex justify-between items-center">
            <div className='flex gap-3 items-center'>
              <Button variant="outline" className='p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 h-8 w-8 rounded-[10px]'>
                <Minus className="" />
                </Button>
                <div>15</div>
                <Button variant="outline" className='p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 h-8 w-8 rounded-[10px]' >
                <Plus className="h4 w-4" />
                </Button>
            </div>
            <div className="font-bold">1280 ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
