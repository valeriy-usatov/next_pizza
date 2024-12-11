import { create } from 'zustand';

interface State {
  searchInput: string;
  setActiveInput: (activeId: string) => void;
}

export const useSearchStore = create<State>()((set) => ({
  searchInput: '',
  setActiveInput: (activeId: string) => set({ searchInput:activeId }),
}));

// export const useCategoryStore = create<State>()((set) => ({
//     activeId: 1,
//     setActiveId: (activeId: number) => set({ activeId }),
//   }));
