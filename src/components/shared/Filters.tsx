'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import FilterCheckbox from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import CheckboxFiltersGroup from './CheckboxFiltersGroup';
import { pizzaSizeOptions, pizzaTypes } from '../../../prisma/constant';
import { useFiltersStore } from '@/store/filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

type SelectedItem = {
  id: number;
  name: string;
};

const Filters = () => {
  const router = useRouter();
  const isMounted = useRef(false);

  const { price, size, type, filterIngredients, updatePrice, updateSize, updateType } =
    useFiltersStore();

  // Мемоизация фильтров для передачи в qs.stringify
  const filter = useMemo(() => {
    return {
      priceFrom: price.priceFrom,
      priceTo: price.priceTo,
      size: size.map((item) => item.name.replace(' см', '')), // Убираем " см"
      type: type.map((item) => item.name),
      ingredients: filterIngredients.map((item) => item.name),
    };
  }, [price, type, size, filterIngredients]);

  // Преобразование фильтров в строку запроса
  const filterQueryString = useMemo(() => {
    return qs.stringify(filter, {
      arrayFormat: 'comma',
      encode: true, // Включаем правильное кодирование
      encodeValuesOnly: true, // Кодируем только значения, а не ключи
    });
  }, [filter]);

  useEffect(() => {
    if (isMounted.current) {
      // Обновляем URL при изменении строки запроса
      router.push(`?${filterQueryString}`, {
        scroll: false /* отмена скрола */,
      });
      console.log('filter', filter);
    }
    isMounted.current= true;
  }, [filterQueryString, router]);

  // выбран ли чекбокс, используем метод some() для массива
  const isChecked = (id: number, selectedItems: SelectedItem[]) =>
    selectedItems.some((item) => item.id === id);

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
    <div className="">
      <h3 className="mb-7 font-extrabold text-2xl">Фильтрация</h3>
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      {/* Размеры */}
      <div className="flex flex-col gap-4 border-b py-6 border-gray-300">
        <p className="font-bold mb-3">Размеры</p>
        <div className="flex flex-col gap-3">
          {pizzaSizeOptions.map((item) => (
            <FilterCheckbox
              text={item.text}
              value={item.text}
              key={item.id}
              checked={isChecked(item.id, size)} // Проверяем в глобальном хранилище
              onCheckedChange={(checked) =>
                handleCheckedChange(item.id, item.text, updateSize, size, checked)
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
              placeholder={String(price.priceFrom)}
              value={String(price.priceFrom || 0)}
              min={0}
              max={1000}
              className="pr-6"
              onChange={(e) => updatePrice({ ...price, priceFrom: Number(e.target.value) })}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">₽</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder={String(price.priceTo)}
              value={String(price.priceTo || 1000)}
              min={100}
              max={30000}
              className="pr-6"
              onChange={(e) => updatePrice({ ...price, priceTo: Number(e.target.value) })}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500"> ₽</span>
          </div>
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => updatePrice({ priceFrom, priceTo })}
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
              checked={isChecked(item.id, type)} // Проверяем в глобальном хранилище
              onCheckedChange={(checked) =>
                handleCheckedChange(item.id, item.text, updateType, type, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
