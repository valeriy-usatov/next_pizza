'use client';
import React, { useEffect, useMemo, useState } from 'react';
import FilterCheckbox from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import CheckboxFiltersGroup from './CheckboxFiltersGroup';
import { pizzaSizeOptions, pizzaTypes } from '../../../prisma/constant';
import { useFiltersStore } from '@/store/filters';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';


interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

type SelectedItem = {
  id: number;
  name: string;
};

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectPrice, setSelectPrice] = useState<PriceProps>({ });
  const [selectedSize, setSelectedSize] = useState<{ id: number; name: string }[]>([]);
  const [selectedType, setSelectedType] = useState<{ id: number; name: string }[]>([]);

  const { price, size, type, filterIngredients, updatePrice, updateSize, updateType } =
    useFiltersStore();
  
  // Обновление фильтров в глобальном хранилище
  useEffect(() => {
    updatePrice(selectPrice);
    updateSize(selectedSize);
    updateType(selectedType);
  }, [selectPrice, selectedSize, selectedType]);

  // Мемоизация фильтров для передачи в qs.stringify
  const filter = useMemo(() => {
    return {
      priceFrom: selectPrice.priceFrom,
      priceTo: selectPrice.priceTo,
      size: selectedSize.map((item) => item.name),
      type: selectedType.map((item) => item.name),
      ingredients: filterIngredients.map((item) => item.name),
    };
  }, [selectPrice  , selectedSize, selectedType, filterIngredients]);

  console.log("searchParams",searchParams, 9999);
  

  // Преобразование фильтров в строку запроса
  const filterQueryString = useMemo(() => {
    return qs.stringify(filter, { arrayFormat: 'comma' });
    
  }, [filter]);

  useEffect(() => {
    // Обновляем URL при изменении строки запроса
    router.push(`?${filterQueryString}`);
  }, [filterQueryString, router]);


  console.log('Filter Query String:', filterQueryString);

  // выбран ли чекбокс, используем метод some() для массива
  const isChecked = (id: number, selectedItems: SelectedItem[]) =>
    selectedItems.some((item) => item.id === id);

  const handleCheckedChange = (
    id: number,
    name: string,
    setSelected: React.Dispatch<React.SetStateAction<SelectedItem[]>>,
    checked: boolean,
  ) => {
    setSelected((prev) => {
      if (checked) {
        // Добавляем объект в массив
        return [...prev, { id, name }];
      } else {
        // Убираем объект из массива
        return prev.filter((item) => item.id !== id);
      }
    });
  };

  return (
    <div className="">
      <h3 className="mb-7 font-extrabold text-2xl">Фильтрация</h3>
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <p className="font-bold mb-3">Размеры</p>
        <div className="flex flex-col gap-3">
          {pizzaSizeOptions.map((item) => (
            <FilterCheckbox
              text={item.text}
              value={item.text}
              key={item.id}
              checked={isChecked(item.id, selectedSize)}
              onCheckedChange={(checked) =>
                handleCheckedChange(item.id, item.value, setSelectedSize, checked)
              }
            />
          ))}
        </div>
      </div>
      {/* Фильтр цен */}
      <div className="mt-5 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-4">
          <div className="relative">
            <Input
              type="number"
              placeholder={String(selectPrice.priceFrom)}
              value={String(selectPrice.priceFrom || 0)}
              min={0}
              max={1000}
              className="pr-6"
              onChange={(e) =>
                setSelectPrice({ ...selectPrice, priceFrom: Number(e.target.value) })
              }
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">₽</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder={String(selectPrice.priceTo )}
              value={String(selectPrice.priceTo || 1000)}
              min={100}
              max={30000}
              className="pr-6"
              onChange={(e) => setSelectPrice({ ...selectPrice, priceTo: Number(e.target.value) })}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500"> ₽</span>
          </div>
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[selectPrice.priceFrom || 0, selectPrice.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setSelectPrice({ priceFrom, priceTo })}
        />
        <CheckboxFiltersGroup limit={6} />
      </div>
      {/* Тип теста: */}
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <p className="font-bold mb-3">Тип теста:</p>
        <div className="flex flex-col gap-3">
          {pizzaTypes.map((item) => (
            <FilterCheckbox
              text={item.text}
              value={item.text}
              key={item.id}
              className="rounded-[18px]"
              checked={isChecked(item.id, selectedType)}
              onCheckedChange={(checked) =>
                handleCheckedChange(item.id, item.text, setSelectedType, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
