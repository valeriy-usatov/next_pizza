import Image from "next/image";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui";
import { SheetClose } from "../ui/sheet";

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center mb-auto gap-3 p-10 text-center">
      <Image src="/empty-box.png" alt="Image" width={120} height={120} />
      <h2 className="text-2xl font-bold text-black">Корзина пустая</h2>
      <p className="text-sm text-gray-400">
        Добавьте хотя бы одну пиццу, чтобы совершить заказ
      </p>
      <SheetClose>
        <Button className="w-56 h-12 text-base mt-5" size="lg">
          <ArrowLeft className="w-5 mr-2" />
          Вернуться назад
        </Button>
      </SheetClose>
    </div>
  );
};

export default CartEmpty;
