import { create } from 'zustand';

interface State {
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}
//TODO Maybe we can dont use zustand?
export const useStore = create<State>((set) => ({
  selectedOptions: [],
  setSelectedOptions: (options: string[]) => set({ selectedOptions: options })
}));
