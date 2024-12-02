import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import FilterCheckbox from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import CheckboxFiltersGroup from './CheckboxFiltersGroup';

const Filters = () => {
  return (
    <div className="">
      <h3 className="mb-7 font-extrabold text-2xl">Фильтрация</h3>
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      {/* Фильтр цен */}
      <div className="mt-5 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-4">
          <div className="relative">
            <Input type="number" placeholder="0" min={0} max={1000} className="pr-6" />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">₽</span>
          </div>
          <div className="relative">
            <Input type="number" placeholder="500" min={100} max={30000} className="pr-6" />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">₽</span>
          </div>
        </div>
        <RangeSlider min={0} max={500} step={10} />
        <CheckboxFiltersGroup limit={6}/>
      </div>
    </div>
  );
};

export default Filters;
