'use client';

import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import FilterCheckbox, { FilterChecboxProps } from './FilterCheckbox';
import { allCheckboxFilter } from '@/data/constant';
import { ingredients } from '../../../prisma/constant';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

interface Props {
  items?: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}

const CheckboxFiltersGroup = ({
  items,
  defaultItems,
  limit = 2,
  searchInputPlaceholder = 'Поиск...',
  defaultValue,
  className,
}: Props) => {
  const [isShowAll, SetIsShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const  list = isShowAll ? allCheckboxFilter.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase())) : allCheckboxFilter.slice(0, limit);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="mt-14">
      <p className="font-bold mb-4">Ингредиенты:</p>
      <div className="mb-8">
        {isShowAll && <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} />}
      </div>
      <div className="inline-flex flex-col gap-4 pr-2 border-gray-300">
        {list.map((item, index) => (
          <div className="">
            <FilterCheckbox key={`${item}_${index}`} text={item} value={item} />
          </div>
        ))}
        {allCheckboxFilter.length > limit && (
          <button onClick={() => SetIsShowAll(!isShowAll)} className="text-primary text-left">
            {isShowAll ? (
              <div className="flex items-center gap-2">
                <ArrowUp size={16} />
                Свернуть
              </div>
            ) : (
              'Показать все'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckboxFiltersGroup;
