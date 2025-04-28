import React from "react";
import { ItemsDetails } from "./ItemsDetails";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";
import { WhiteBlock } from "./WhiteBlock";

const Taxes = 0.15;
const delivery_price = 250;

interface Props {
  totalAmount: () => number;
  loading?: boolean;
}

const CheckoutSidebar = ({ totalAmount, loading }: Props) => {
  return (
    <div className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Итого:</span>
          {totalAmount() === 0 ? (
            "0"
          ) : (
            <span className="text-[34px] font-extrabold">
              {totalAmount() + delivery_price + totalAmount() * Taxes} ₽
            </span>
          )}
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
          value={Math.floor(totalAmount() * Taxes)}
        />
        <ItemsDetails
          title={
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-gray-400" />
              Доставка
            </div>
          }
          value={delivery_price}
        />
        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Перейти к оплате
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

export default CheckoutSidebar;
