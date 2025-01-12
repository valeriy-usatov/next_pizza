'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import Image from 'next/image';
import PizzaImage from './PizzaImage';
import PizzaSize from './PizzaSize';
import { pizzaSizeItems, pizzaTypeItems } from '@/data/constant';
import { Ingredient, ProductItem } from '@prisma/client';
import IngredientItem from './IngredientItem';
import PizzaType from './PizzaType';

interface Props {
  imageUrl: string;
  name: string;
  id: number;
  ingredients: Ingredient[];
  items?: ProductItem[];
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
}
type PizzaSize = 20 | 30 | 40;
type PizzaType = 1 | 2;

const ChoosePizzaForm = ({
  name,
  id,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}: Props) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [activeIngredients, setActiveIngredients] = useState<number[]>([]);
  const [totalPriceIngredients, setTotalPrice] = useState<number[]>([]);
  const [productItem, setproductItem] = useState<ProductItem[]>([]);
  const [productType, setproductType] = useState<PizzaType>(2);

  console.log('activeIngredients', activeIngredients);

  useEffect(() => {
    setTotalPrice(
      ingredients.filter((item) => activeIngredients.includes(item.id)).map((item) => item.price),
    );
  }, [activeIngredients, size]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/productItem`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setproductItem(data); //
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const newItem = productItem
    .filter((item) => item.productId === id)
    .find((item) => item.size === size && item.pizzaType === type);

  const newItemPizza = productItem.filter((item) => item.productId === id);

  const textDetaills = '25 см, традиционное тесто 25, 380 г';
  const totalPrice = newItem?.price || 0;

  const toggleIngredient = (id: number) => {
    setActiveIngredients(
      (prev) =>
        prev.includes(id)
          ? prev.filter((ingredientId) => ingredientId !== id) // Убираем ID из массива
          : [...prev, id], // Добавляем ID в массив
    );
  };

  const hanleClickAdd = () => {
    console.log({
      size,
      type,
      activeIngredients,
    });
  };

  const availablePizzaSizes = productItem.filter(
    (item) => item.productId === id && item.pizzaType == type,
  );

  // console.log('availablePizzaSizes', availablePizzaSizes);
  // создаем массив, в котором исключаем размеры размеры size
  const newpizzaSize = [...availablePizzaSizes.map((item, index) => item.size)];
  // console.log('newpizzaSize', newpizzaSize[0]);

  const updatedPizzaSizeItems = pizzaSizeItems.map((item) => ({
    ...item,
    ...(newpizzaSize.includes(Number(item.value)) ? {} : { disabled: true }),
  }));

  // console.log(updatedPizzaSizeItems);

  useEffect(() => {
    const availableSize = updatedPizzaSizeItems.find((item,index) => !item.disabled);
    setSize(Number(availableSize?.value) as PizzaSize);
    console.log(availableSize);
  }, [type]);

  return (
    <div className="flex flex-1 gap-5">
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col gap-8">
        <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{name}</h2>
        <p className="text-gray-400">{`${size} см ${
          type === 1 ? 'традиционное' : 'тонкое'
        } тесто`}</p>
        <PizzaSize
          value={String(size)}
          setSize={(value) => setSize(value as PizzaSize)} // Приводим к типу PizzaSize
          items={updatedPizzaSizeItems}
          className="grid grid-cols-3"
          size={size}
          newpizzaSize={newpizzaSize[0]}
          type={type}

        />
        <PizzaType
          value={String(type)}
          setSize={(value) => setType(value as PizzaType)} // Приводим к типу PizzaSize
          items={pizzaTypeItems}
          className="grid grid-cols-2"
        />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(ingredient.id)}
                active={activeIngredients.includes(ingredient.id)} // Проверяем активен ли ингредиент
              />
            ))}
          </div>
        </div>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full" onClick={hanleClickAdd}>
          Добавить в корзину за {totalPrice + totalPriceIngredients.reduce((a, b) => a + b, 0)} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
