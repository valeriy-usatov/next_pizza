'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import FilterCheckbox, { FilterChecboxProps } from './FilterCheckbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';
import { useFiltersStore } from '@/store/filters';

type Item = FilterChecboxProps;

type SelectedItem = {
  id: number;
  name: string;
};
interface Props {
  items?: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}

interface Checkbox {
  id: number;
  name: string;
}

const CheckboxFiltersGroup = ({
  items,
  defaultItems,
  limit = 2,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  defaultValue,
  className,
}: Props) => {
  const [isShowAll, SetIsShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Checkbox[]>([]);
  // const [selectedItems, setSelectedItems] = useState<{ id: number; name: string }[]>([]);
  const { filterIngredients, updateFilterIngredients } = useFiltersStore();

  // выбран ли чекбокс, используем метод some() для массива
  const isChecked = (id: number, selectedItems: SelectedItem[]) =>
    selectedItems.some((item) => item.id === id);

  const list = isShowAll
    ? ingredients.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    : ingredients.slice(0, limit);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await res.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (isLoading) {
    return (
      <div>
        <p className="font-bold mb-4">Ингредиенты:</p>
        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
        ))}
        <Skeleton className="h-6 w-1/3 mb-4 rounded-[8px]" />
      </div>
    );
  }
  // Обработчик для изменения состояния чекбокса
  const handleCheckedChange = (
    id: number,
    name: string,
    updateFilter: (items: SelectedItem[]) => void,
    selectedItems: SelectedItem[],
    checked: boolean,
  ) => {
    const updatedItems = checked
      ? [...selectedItems, { id, name }] // Добавляем объект
      : selectedItems.filter((item) => item.id !== id); // Убираем объект

    updateFilter(updatedItems); // Обновляем хранилище
  };

  return (
    <div className="mt-14">
      <p className="font-bold mb-4">Ингредиенты:</p>
      <div className="mb-8">
        {isShowAll && <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} />}
      </div>
      <div className="inline-flex flex-col gap-4 pr-2 border-gray-300">
        {list.map((item, index) => (
          <div key={item.id} className="">
            <FilterCheckbox
              key={`${item.id}_${index}`}
              text={item.name}
              value={item.name}
              checked={isChecked(item.id, filterIngredients)}
              onCheckedChange={(checked) =>
                handleCheckedChange(
                  item.id,
                  item.name,
                  updateFilterIngredients,
                  filterIngredients,
                  checked,
                )
              }
            ></FilterCheckbox>
          </div>
        ))}
        {ingredients.length > limit && (
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
