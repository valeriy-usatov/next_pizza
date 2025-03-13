import { CartItemDTO } from './../../@types/cartTypes';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
