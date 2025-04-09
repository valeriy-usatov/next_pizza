'use client';
import CartItem from '@/components/shared/CartItem';
import { Container } from '@/components/shared/Container';
import { ItemsDetails } from '@/components/shared/ItemsDetails';
import { WhiteBlock } from '@/components/shared/WhiteBlock';
import { Button, Input } from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/store/cart';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CheckoutPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { pizzas, totalAmount, clearCart } = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container className="mt-10">
      <h2 className="font-extrabold text-4xl mb-8">Оформление заказа</h2>
      <div className="flex gap-10 ">
        {/* левая часть  */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина" className="" > 
         
          {pizzas.map((pizza, index) => (
              <CartItem key={pizza.name} pizza={pizza} index={index}  />
            ))}
          
          </WhiteBlock>

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="adres" className="text-base" placeholder="Введите адрес" />
              <Textarea
                className="text-base"
                rows={5}
                placeholder="Укажите дополнительную информацию для курьера"
              />
            </div>
          </WhiteBlock>
        </div>
        {/* Правая часть */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">{totalAmount() + 120 + totalAmount() * 0.05} ₽</span>
            </div>
            <ItemsDetails
              title={
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-gray-400" />
                  Стоимость товаров
                </div>
              }
              value={totalAmount()}
            />
            <ItemsDetails
              title={
                <div className="flex items-center gap-3">
                  <Percent size={18} className="text-gray-400" />
                  Налоги
                </div>
              }
              value={totalAmount() * 0.05}
            />
            <ItemsDetails
              title={
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-gray-400" />
                  Доставка
                </div>
              }
              value={120}
            />
            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
