import { create } from 'zustand';

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

export const useFiltersStore = create<FiltersState>((set) => ({
  price: { priceFrom: 0, priceTo: 500 },
  size: [],
  type: [],
  filterIngredients:[],
  updatePrice: (price) => set(() => ({ price })),
  updateSize: (size) => set(() => ({ size })),
  updateType: (type) => set(() => ({ type })),
  updateFilterIngredients: (filterIngredients) => set(() => ({ filterIngredients })),
}));
