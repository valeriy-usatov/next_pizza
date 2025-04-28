"use client";

import { useCartStore } from "@/store/cart";
import { ProductItem } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui";

interface Props {
  id: number;
  imageUrl: string;
  name: string;
}

const ChooseProductForm = ({ name, imageUrl, id }: Props) => {
  const addPizza = useCartStore((state) => state.addPizza);
  const [productItem, setproductItem] = useState<ProductItem[]>([]);
  const router = useRouter();
  const totalPrice =
    productItem.find((item) => item.productId === id)?.price || 0;

  const newItem = productItem.find((item) => item.productId === id);

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

  const hanleClickAdd = () => {
    const newPizza = {
      id: id,
      productItemId: newItem?.id,
      name,
      imageUrl,
      count: 1,
      price: totalPrice,
    };

    addPizza(newPizza);
    toast.success(`${name} добавлена в корзину`);

    router.back();
  };

  return (
    <div className="flex flex-1">
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={350}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="flex flex-col w-[490px] bg-[#f7f6f5] p-10">
        <h2 className="text-4xl font-extrabold tracking-[-0.01em]">{name}</h2>
        <p className="text-gray-400"></p>
        <Button
          className="mt-auto h-[55px] px-10 text-base rounded-[18px] w-full"
          onClick={hanleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;
