import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface SelectedItem {
  id: number;
  name: string;
}

interface FiltersState {
  price: PriceProps;
  size: SelectedItem[];
  type: SelectedItem[];
  filterIngredients: SelectedItem[];
  updatePrice: (price: PriceProps) => void;
  updateSize: (size: SelectedItem[]) => void;
  updateType: (type: SelectedItem[]) => void;
  updateFilterIngredients: (type: SelectedItem[]) => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      price: { priceFrom: 0, priceTo: 1000 },
      size: [],
      type: [],
      filterIngredients: [],
      updatePrice: (price) => set(() => ({ price })),
      updateSize: (newSize: SelectedItem[]) => set((state) => ({ ...state, size: newSize })),
      updateType: (newType: SelectedItem[]) => set((state) => ({ ...state, type: newType })),
      // updateSize: (size) => set(() => ({ size })),
      // updateType: (type) => set(() => ({ type })),
      updateFilterIngredients: (NewFilterIngredients: SelectedItem[]) => set((state) => ({ ...state, filterIngredients: NewFilterIngredients })),
    }),
    {
      name: 'filter', // Уникальное имя в localStorage
    },
  ),
);
