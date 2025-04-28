"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";

const CartButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { totalAmount, pizzas } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Button
      ref={ref}
      {...props}
      className="group flex items-center gap-2 text-white relative"
    >
      <span className="">{totalAmount()} ₽</span>
      <span className="w-[1px] h-full bg-white/30 mx-3"></span>
      <div className="flex items-center gap-2 duration-300 group-hover:opacity-0">
        <ShoppingCart size={16} color="#fff" strokeWidth={2} className="" />
        <span>{pizzas.length}</span>
      </div>
      <ArrowRight
        size={16}
        color="#fff"
        strokeWidth={2}
        className="absolute right-5 duration-300 -translate-x-2 opacity-0 group-hover:opacity-100"
      />
    </Button>
  );
});

CartButton.displayName = "CartButton"; // Для удобства отладки
export default CartButton;
