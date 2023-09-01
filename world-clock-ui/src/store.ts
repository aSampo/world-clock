import { create } from 'zustand';

interface State {
  selectedOptions: string[];
  filteredOptions: string[];
  // addOption: (option: string) => void;
  // removeOption: (option: string) => void;
  setSelectedOptions: (options: string[]) => void;
  setFilteredOptions: (options: string[]) => void; // Nueva función para establecer filteredOptions
}

export const useStore = create<State>((set) => ({
  selectedOptions: [],
  filteredOptions: [],
  // addOption: (option: string) => set((state) => ({ selectedOptions: [...state.selectedOptions, option] })),
  // removeOption: (option: string) => set((state) => ({ selectedOptions: state.selectedOptions.filter((item) => item !== option) })),
  setSelectedOptions: (options: string[]) => set({ selectedOptions: options }),
  setFilteredOptions: (options: string[]) => set({ filteredOptions: options })
}));
