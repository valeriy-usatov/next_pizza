"use client";

import { useState } from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  value?: Variant["value"];
  className?: string;
  newpizzaSize?: number | null;
  setSize?: (value: number) => void;
  type?: 1 | 2;
  size?: 20 | 30 | 40;
}

const PizzaType = ({ items = [], className = "", setSize }: Props) => {
  const [activeSize, setActiveSize] = useState(0);

  const handleClick = (item: Variant, index: number) => {
    setActiveSize(index); // Локальное обновление состояния активного размера
    setSize?.(Number(item.value));
  };

  // useEffect(() => {
  //     setActiveSize(type ? 0 : (size===20 ? 0 : size===30 ? 1 : 2) );
  // }, [size, type]);

  return (
    <div className={`${className} bg-gray-200 w-[420px] p-1 rounded-3xl`}>
      {items.map((item, index) => (
        <button
          key={item.name}
          className={`flex items-center justify-center px-6 ${
            item.disabled
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          } ${activeSize === index ? "bg-white rounded-3xl px-6 py-2" : ""}`}
          onClick={() => handleClick(item, index)}
          // onClick={() => setActiveSize(index)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default PizzaType;
