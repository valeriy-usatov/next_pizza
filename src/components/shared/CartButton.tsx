import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const CartButton = () => {
  return (
    <Button className="group flex items-center gap-2 text-white relative">
      <span className="">502 р</span>
      <span className="w-[1px] h-full bg-white/30 mx-3"></span>
      <div className="flex items-center gap-1 duration-300 group-hover:opacity-0">
        <ShoppingCart size={16} color="#fff" strokeWidth={2} className="" />
        <span>3</span>
      </div>
      <ArrowRight
        size={16}
        color="#fff"
        strokeWidth={2}
        className="absolute right-5 duration-300 -translate-x-2 opacity-0 group-hover:opacity-100"
      />
    </Button>
  );
};

export default CartButton;
