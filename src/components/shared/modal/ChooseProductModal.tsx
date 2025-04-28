"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../ChooseProductForm";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { ProductWithRelations } from "../../../../@types/prisma";
import ChoosePizzaForm from "../ChoosePizzaForm";

interface Props {
  product: ProductWithRelations;
  className?: string;
}
const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            id={product.id}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            id={product.id}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
