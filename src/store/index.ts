import { create } from 'zustand';

interface MainState {
  backgroundIndex: number;
  setBackgroundIndex: (index: number) => void;
}

export const useMainStore = create<MainState>((set) => ({
  backgroundIndex: 1,
  setBackgroundIndex: (index) => set({ backgroundIndex: index }),
}));
