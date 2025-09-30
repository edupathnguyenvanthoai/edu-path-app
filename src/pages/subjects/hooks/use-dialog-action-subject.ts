import { create } from 'zustand';

type DialogActionSubjectResponse = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};
export const useDialogActionSubject = create<DialogActionSubjectResponse>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  onToggle: () => set((state) => ({ open: !state.open })),
}));
