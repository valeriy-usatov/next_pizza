// 'use client';
import React from "react";
import { Container } from "@/components/shared/Container";
// import { PizzaSizes, pizzaTypes } from '../../../../prisma/constant';
import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prismaClient";
import ChoosePizzaForm from "@/components/shared/ChoosePizzaForm";
import ChooseProductForm from "@/components/shared/ChooseProductForm";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });
  if (!product) {
    console.error(`Product with ID ${params.id} not found`);
    return notFound();
  }

  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Container className="mt-10">
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
    </Container>
  );
};

export default ProductPage;
