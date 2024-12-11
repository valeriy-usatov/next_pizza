'use client';

import { allCategories } from '@/data/constant';
import { useCategoryStore } from '@/store/category';
import Link from 'next/link';
import React, { useState } from 'react';

const Categories = () => {
  const [current, setCurrent] = useState<number>(0);
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  const handleClickCategory = (index: number) => {
    setCurrent(activeCategoryId);
  };

  return (
    <div className="">
      <div className="mt-5 inline-flex items-center gap-2 bg-[#FAFAFA] rounded-2xl p-1">
        {allCategories.map((item, index) => (
          <Link
            href={`/#${item.name}`}
            key={`${item.id}_${index}`}
            className={`cursor-pointer flex items-center font-bold h-11 rounded-2xl px-5 ${
              activeCategoryId === item.id ? 'bg-white text-primary  shadow-md shadow-gray-200' : ''
            }`}
            onClick={() => handleClickCategory(index)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
