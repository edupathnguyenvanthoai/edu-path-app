import { create } from 'zustand';

type DialogSetGoalProps = {
  open: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setToggle: () => void;
};

export const useDialogSetGoal = create<DialogSetGoalProps>((set) => {
  console.log(123);
  return {
    open: false,
    setTrue: () => set({ open: true }),
    setFalse: () => set({ open: false }),
    setToggle: () => set((state) => ({ open: !state.open })),
  };
});
