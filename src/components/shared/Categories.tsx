"use client";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCategoryStore } from "@/store/category";

interface PropsCategory {
  id: number;
  name: string;
  products: Product[];
}

const Categories = () => {
  // const [current, setCurrent] = useState<number>(0);
  const [categories, setCategories] = useState<PropsCategory[]>([]);
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setCategories(data); // Сохраняем данные в состоянии
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);

    fetchData();
  }, []);

  // const handleClickCategory = (id: number) => {
  //   setCurrent(id);
  // };

  return (
    <div className="">
      <div className="mt-5 inline-flex items-center gap-2 bg-[#FAFAFA] rounded-2xl p-1">
        {categories.length > 0 &&
          categories.map(
            (item, index) =>
              item.products.length > 0 && ( // Проверяем свойство products у конкретного элемента
                <Link
                  href={`/#${item.name}`}
                  key={`${item.id}_${index}`}
                  className={`cursor-pointer flex items-center font-bold h-11 rounded-2xl px-5 ${
                    activeCategoryId === item.id
                      ? "bg-white text-primary shadow-md shadow-gray-200"
                      : ""
                  }`}
                  // onClick={() => handleClickCategory(item.id)}
                >
                  {item.name}
                </Link>
              ),
          )}
      </div>
    </div>
  );
};

export default Categories;
