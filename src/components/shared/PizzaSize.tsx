'use client';

import React, { useEffect, useState } from 'react';
import { pizzaSizes } from '../../../prisma/constant';

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  value?: Variant['value'];
  className?: string;
  newpizzaSize?: number | null;
  setSize?: (value: number) => void;
  type?: 1 | 2;
  size?: 20 | 30 | 40;
}

const PizzaSize = ({
  items = [],
  onClick,
  value,
  type,
  className = '',
  setSize,
  size,
  newpizzaSize,
}: Props) => {
  const [activeSize, setActiveSize] = useState(0);


  const handleClick = (item: Variant, index: number) => {
    setActiveSize(index); // Локальное обновление состояния активного размера
    setSize?.(Number(item.value));
  };

  useEffect(() => {
      setActiveSize(newpizzaSize===20 ? 0 : newpizzaSize===30 ? 1 : 2);
  }, [newpizzaSize]);

  return (
    <div className={`${className} bg-gray-200 w-[420px] p-1 rounded-3xl`}>
      {items.map((item, index) => (
        <button
          key={item.name}
          className={`flex items-center justify-center px-6 ${
            item.disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${activeSize === index ? 'bg-white rounded-3xl px-6 py-2' : ''}`}
          onClick={() => handleClick(item, index)}
          // onClick={() => setActiveSize(index)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default PizzaSize;
