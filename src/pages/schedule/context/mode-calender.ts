import { create } from 'zustand';

type useModeCalender = {
  editMode: boolean;
  toggle: () => void;
  setEditMode: (mode: boolean) => void;
};
export const useModeCalender = create<useModeCalender>((set) => ({
  editMode: false,
  toggle: () => set((state) => ({ editMode: !state.editMode })),
  setEditMode: (mode: boolean) => set({ editMode: mode }),
}));
