'use client';
import React, { useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CartButton from './CartButton';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CartItem from './CartItem';
import { useCartStore } from '@/store/cart';
import CartEmpty from './CartEmpty';

type Ingredient = {
  name: string;
  price: number;
};

type ProductItem = {
  product: {
    name: string;
    imageUrl: string;
  };
  size: number;
  pizzaType: number;
  price: number;
};

type CartItemData = {
  id: number;
  productItem: ProductItem;
  ingredients: Ingredient[];
  quantity: number;
};

type PizzaType = {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  type: number;
  price: number;
  count: number;
  activeIngredients: string[];
};
type Pizza = {
  productItemId: number;
  id: number;
  name: string;
  imageUrl: string;
  size?: number;
  type?: number;
  price: number;
  count: number;
  activeIngredients: string[];
};
const CartSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Достаём данные и действия из хранилища
  const { pizzas, setCart, totalAmount, clearCart } = useCartStore();
  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`);
        if (!res.ok) throw new Error('Ошибка при загрузке корзины');

        const data = await res.json();
        const formattedPizzas: Pizza[] = data.items.map((item: CartItemData) => ({
          id: item.id,
          name: item.productItem.product.name,
          imageUrl: item.productItem.product.imageUrl,
          size: item.productItem.size,
          type: item.productItem.pizzaType,
          price: item.productItem.price + item.ingredients.reduce((sum, ing) => sum + ing.price, 0),
          count: item.quantity,
          activeIngredients: item.ingredients.map((ing) => ing.name),
        }));

        setCart(formattedPizzas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [setCart]);

  const getItemCountText = (count: number) => {
    if (count === 1) return `${count} товар`;
    if (count > 1 && count < 5) return `${count} товара`;
    return `${count} товаров`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col  pb-0 bg-[#F4F1EE]">
        {pizzas.length > 0 && (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{getItemCountText(pizzas.length)}</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {/* {items} */}

        {pizzas.length === 0 ? (
          <div className="flex flex-1 items-center justify-center mx-auto my-28">
            <CartEmpty />
          </div>
        ) : (
          <div className="flex flex-col flex-1 items-start -mx-6 mt-5 overflow-auto gap-2">
            {pizzas.map((pizza, index) => (
              <CartItem key={pizza.name} pizza={pizza} index={index} />
            ))}
          </div>
        )}

        {pizzas.length > 0 && (
          <SheetFooter className="-mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого:
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-lg">{totalAmount()} </span>
              </div>

              <Link href="/cart">
                <Button
                  // onClick={() => setRedirecting(true)}
                  // loading={loading || redirecting}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Оформить заказ
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
