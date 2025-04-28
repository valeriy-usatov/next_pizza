import { Ingredient } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Pizza = {
  id: number;
  index?: number;
  name: string;
  imageUrl: string;
  size?: number;
  type?: number;
  price: number;
  count: number;
  activeIngredients?: string[];
  productItemId: number | undefined;
  ingredients?: Ingredient[];
};

type CartState = {
  pizzas: Pizza[];
  setCart: (pizzas: Pizza[]) => void;
  addPizza: (pizza: Pizza) => void;
  updatePizzaCount: (id: number, newCount: number) => void;
  removePizza: (id: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  loading?: boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      pizzas: [],

      setCart: (pizzas) => set({ pizzas }),

      addPizza: async (pizza) => {
        const { productItemId, ingredients, ...localPizzaData } = pizza;

        // Устанавливаем loading = true
        set((state) => ({
          pizzas: state.pizzas.map((p) =>
            p.productItemId === productItemId ? { ...p, loading: true } : p,
          ),
        }));

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productItemId, ingredients }),
            },
          );

          if (!res.ok)
            throw new Error("Ошибка при добавлении товара в корзину");

          const updatedCart = await res.json();

          const matchedItem = updatedCart.items.find(
            (item: { productItemId: number; ingredients: Ingredient[] }) => {
              if (item.productItemId !== productItemId) return false;

              const ingIdsFromStore = (ingredients ?? [])
                .map((i) => i.id)
                .sort();
              const ingIdsFromServer = item.ingredients
                .map((i: Ingredient) => i.id)
                .sort();

              return (
                ingIdsFromStore.length === ingIdsFromServer.length &&
                ingIdsFromStore.every(
                  (id, index) => id === ingIdsFromServer[index],
                )
              );
            },
          );

          if (!matchedItem) return;

          set((state) => {
            const existingPizza = state.pizzas.find((p) => {
              if (p.productItemId !== productItemId) return false;

              const localIng = (p.ingredients ?? []).map((i) => i.id).sort();
              const newIng = (ingredients ?? []).map((i) => i.id).sort();

              return (
                localIng.length === newIng.length &&
                localIng.every((id, index) => id === newIng[index])
              );
            });

            if (existingPizza) {
              return {
                pizzas: state.pizzas.map((p) =>
                  p.productItemId === productItemId &&
                  JSON.stringify(
                    (p.ingredients ?? []).map((i) => i.id).sort(),
                  ) ===
                    JSON.stringify((ingredients ?? []).map((i) => i.id).sort())
                    ? { ...p, count: p.count + 1, loading: false }
                    : p,
                ),
              };
            } else {
              return {
                pizzas: [
                  ...state.pizzas,
                  {
                    ...localPizzaData,
                    ...matchedItem,
                    count: 1,
                    loading: false,
                  },
                ],
              };
            }
          });
        } catch (error) {
          console.error("Ошибка при добавлении товара:", error);
          // Сбрасываем loading даже в случае ошибки
          set((state) => ({
            pizzas: state.pizzas.map((p) =>
              p.productItemId === productItemId ? { ...p, loading: false } : p,
            ),
          }));
        }
      },

      updatePizzaCount: async (id, newCount) => {
        set((state) => ({
          pizzas: state.pizzas.map((p) =>
            p.id === id ? { ...p, loading: true } : p,
          ),
        }));

        try {
          const state = get();
          const pizza = state.pizzas.find((p) => p.id === id);
          if (!pizza) return;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                productItemId: pizza.productItemId,
                quantity: newCount,
              }),
            },
          );

          if (!res.ok) throw new Error("Ошибка при обновлении количества");

          set((state) => ({
            pizzas: state.pizzas.map((p) =>
              p.id === id ? { ...p, count: newCount, loading: false } : p,
            ),
          }));
        } catch (error) {
          console.error("Ошибка обновления количества:", error);
          set((state) => ({
            pizzas: state.pizzas.map((p) =>
              p.id === id ? { ...p, loading: false } : p,
            ),
          }));
        }
      },

      removePizza: async (id) => {
        set((state) => ({
          pizzas: state.pizzas.map((p) =>
            p.id === id ? { ...p, loading: true } : p,
          ),
        }));

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
            {
              method: "DELETE",
              body: JSON.stringify({ id }),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (!response.ok) {
            const data = await response.json();
            if (response.status === 404) {
              console.warn(`Item with ID ${id} not found on server.`);
            } else {
              throw new Error(data.error || "Failed to delete item");
            }
          }

          set((state) => ({
            pizzas: state.pizzas.filter((pizza) => pizza.id !== id),
          }));
        } catch (error) {
          console.error("Ошибка при удалении товара:", error);
          set((state) => ({
            pizzas: state.pizzas.map((p) =>
              p.id === id ? { ...p, loading: false } : p,
            ),
          }));
        }
      },

      clearCart: () => set(() => ({ pizzas: [] })),

      totalAmount: () =>
        get().pizzas.reduce((sum, pizza) => sum + pizza.price * pizza.count, 0),
    }),
    { name: "cart-storage" },
  ),
);
