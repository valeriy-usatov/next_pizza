'use client';

import React, { useState } from 'react';
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
}

const PizzaSize = ({items=[], onClick, value, className}: Props) => {
  const [activeSize, setActiveSize] = useState(0);
  
  return (
    <div className="grid grid-cols-3 bg-gray-200 w-[420px] p-1 rounded-3xl">
      {items.map((item, index) => (
        <span
          key={item.name}
          className={`text-center p-2 ${item.disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
            activeSize === index ? 'bg-white rounded-3xl py-2' : ''
          }`}
          onClick={() => setActiveSize(index)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default PizzaSize;
