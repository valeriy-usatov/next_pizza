"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Ingredient, ProductItem } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../ui";
import PizzaImage from "./PizzaImage";
import PizzaSize from "./PizzaSize";
import { pizzaSizeItems, pizzaTypeItems } from "@/data/constant";
import IngredientItem from "./IngredientItem";
import PizzaType from "./PizzaType";
import { useCartStore } from "@/store/cart";

interface Props {
  imageUrl: string;
  name: string;
  id: number;
  items?: ProductItem[];
  ingredients: Ingredient[];
  onSubmit?: (itemId: number, ingredients: number[]) => void;
}
type PizzaSize = 20 | 30 | 40;
type PizzaType = 1 | 2;

const ChoosePizzaForm = ({ name, id, imageUrl, ingredients }: Props) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [totalPriceIngredients, setTotalPrice] = useState<number[]>([]);
  const [productItem, setproductItem] = useState<ProductItem[]>([]);
  const router = useRouter();
  // Добавление пиццы в хранилище
  const addPizza = useCartStore((state) => state.addPizza);

  useEffect(() => {
    setTotalPrice(
      ingredients
        .filter((item) => activeIngredients.includes(item.name))
        .map((item) => item.price),
    );
  }, [activeIngredients, size, ingredients]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/productItem`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setproductItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const newItem = productItem
    .filter((item) => item.productId === id)
    .find((item) => item.size === size && item.pizzaType === type);

  const totalPrice = newItem?.price || 0;

  const toggleIngredient = (name: string) => {
    setActiveIngredients(
      (prev) =>
        prev.includes(name)
          ? prev.filter((ingredientId) => ingredientId !== name) // Убираем ID из массива
          : [...prev, name], // Добавляем ID в массив
    );
  };

  const hanleClickAdd = () => {
    if (!newItem) {
      return;
    }

    const newPizza = {
      id: newItem.id,
      productItemId: newItem.id, // ID варианта пиццы для сервера
      ingredients: activeIngredients
        .map((name) => {
          const ingredient = ingredients.find((item) => item.name === name);
          return ingredient ? ingredient : null; // Возвращаем сам объект ингредиента
        })
        .filter((ingredient) => ingredient !== null), // Убираем null значения

      // Локальные данные для отображения в хранилище
      name,
      imageUrl,
      size,
      type,
      count: 1,
      price: newItem.price + totalPriceIngredients.reduce((a, b) => a + b, 0),
      activeIngredients,
    };

    addPizza(newPizza); // Возможно вы забыли вызвать функцию addPizza
    toast.success(`${name} добавлена в корзину`);

    router.back();
  };

  const availablePizzaSizes = useMemo(() => {
    return productItem.filter(
      (item) => item.productId === id && item.pizzaType === type,
    );
  }, [productItem, id, type]);

  const newpizzaSize = useMemo(() => {
    return availablePizzaSizes.map((item) => item.size);
  }, [availablePizzaSizes]);

  const updatedPizzaSizeItems = useMemo(() => {
    return pizzaSizeItems.map((item) => ({
      ...item,
      ...(newpizzaSize.includes(Number(item.value)) ? {} : { disabled: true }),
    }));
  }, [newpizzaSize]);

  useEffect(() => {
    const availableSize = updatedPizzaSizeItems.find((item) => !item.disabled);
    setSize(Number(availableSize?.value) as PizzaSize);
  }, [type, updatedPizzaSizeItems]);

  return (
    <div className="flex flex-1 gap-5">
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col gap-8">
        <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{name}</h2>
        <p className="text-gray-400">{`${size} см ${
          type === 1 ? "традиционное" : "тонкое"
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
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(ingredient.name)}
                active={activeIngredients.includes(ingredient.name)} // Проверяем активен ли ингредиент
              />
            ))}
          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
          onClick={hanleClickAdd}
        >
          Добавить в корзину за{" "}
          {totalPrice + totalPriceIngredients.reduce((a, b) => a + b, 0)} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
